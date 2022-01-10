/*
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *   http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

import { Injectable } from '@angular/core';
import { QueryEntity } from '@datorama/akita';
import { AlertaAlertState, AlertaAlertStore } from './alerta-alert.store';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AlertaAlert, AlertSeverity, IFAlertSeverity, IFAlertStatus } from './alerta-alert.model';
import { FactoryAssetDetailsWithFields } from '../../factory-asset-details/factory-asset-details.model';
import { OispDeviceQuery } from '../oisp-device/oisp-device.query';
import { TreeNode } from 'primeng/api';

@Injectable({ providedIn: 'root' })
export class AlertaAlertQuery extends QueryEntity<AlertaAlertState> {

  constructor(protected store: AlertaAlertStore,
              protected oispDeviceQuery: OispDeviceQuery) {
    super(store);
  }

  selectOpenAlerts(): Observable<AlertaAlert[]> {
    return this.selectAll().pipe(
      map((alerts: AlertaAlert[]) => {
        return alerts.filter(alert => AlertaAlert.mapStatusToIfAlertStatus(alert.status) === IFAlertStatus.OPEN);
      })
    );
  }

  selectOpenAlertCount(): Observable<number> {
    return this.selectOpenAlerts().pipe(
      map((alerts: AlertaAlert[]) => alerts.length)
    );
  }

  getOpenAlerts(): AlertaAlert[] {
    return this.getAll().filter(alert => AlertaAlert.mapStatusToIfAlertStatus(alert.status) === IFAlertStatus.OPEN);
  }

  joinAssetDetailsWithOpenAlertSeverity(assetDetails: FactoryAssetDetailsWithFields):
    FactoryAssetDetailsWithFields {

    const openAlerts = this.getOpenAlerts();
    const assetDetailsCopy = Object.assign({ }, assetDetails);
    const alertSeverity: AlertSeverity = this.findAlertSeverityByExternalName(assetDetailsCopy.externalName, openAlerts);

    assetDetailsCopy.openAlertSeverity = AlertaAlert.mapSeverityToIFAlertSeverity(alertSeverity);
    return assetDetailsCopy;
  }

  private findAlertSeverityByExternalName(externalName: string, openAlerts: AlertaAlert[]): AlertSeverity {
    let mostCriticalSeverity = null;

    if (externalName) {
      const openAlertsOfExternalId = openAlerts.filter(alert => String(alert.resource) === externalName);
      if (openAlertsOfExternalId.length > 0) {
        const sortedAlerts = openAlertsOfExternalId.sort((openAlert1, openAlert2) =>
          AlertaAlert.mapSeverityToSecurityCode(openAlert1.severity) - AlertaAlert.mapSeverityToSecurityCode(openAlert2.severity));
        mostCriticalSeverity = sortedAlerts[0].severity;
      }
    } else {
      console.warn('[oisp alert query]: ExternalId does not exist');
    }

    return mostCriticalSeverity;
  }

  public getMostCriticalOpenAlertSeverityOfAssetNode(assetNode: TreeNode<FactoryAssetDetailsWithFields>): IFAlertSeverity {
    let mostCriticalOpenAlertSeverity: IFAlertSeverity = assetNode.data?.openAlertSeverity;

    const hasSubsystems = assetNode.children?.length > 0;
    if (hasSubsystems && !assetNode.expanded) {
      for (const childAsset of assetNode.children) {
        const mostCriticalOpenAlertSeverityChild: IFAlertSeverity = this.getMostCriticalOpenAlertSeverityOfAssetNode(childAsset);
        mostCriticalOpenAlertSeverity = AlertaAlert
          .getMoreCriticalIFAlertSeverity(mostCriticalOpenAlertSeverity, mostCriticalOpenAlertSeverityChild);
      }
    }

    return mostCriticalOpenAlertSeverity;
  }

  resetStore() {
    this.store.reset();
  }

  resetError() {
    this.store.setError(null);
  }

}