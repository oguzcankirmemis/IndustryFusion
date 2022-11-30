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


import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Notification } from '../../../../../core/store/ngsi-ld/notification/notification.model';
import { first, map, mergeMap } from 'rxjs/operators';
import { NotificationService } from '../../../../../core/store/ngsi-ld/notification/notification.service';
import { ActivatedRoute } from '@angular/router';
import { FactoryResolver } from '../../../../services/factory-resolver.service';
import { FactoryAssetDetailsWithFields } from '../../../../../core/store/factory-asset-details/factory-asset-details.model';
import { RouteHelpers } from '../../../../../core/helpers/route-helpers';
import { IFAlertStatus } from '../../../../../core/store/ngsi-ld/alerta-alert/alerta-alert.model';

@Component({
  selector: 'app-asset-notifications',
  templateUrl: './asset-notifications.component.html',
  styleUrls: ['./asset-notifications.component.scss']
})
export class AssetNotificationsComponent implements OnInit {

  asset$: Observable<FactoryAssetDetailsWithFields>;

  notificationsOfAsset$: Observable<Notification[]>;

  constructor(private factoryResolver: FactoryResolver,
              private notificationService: NotificationService,
              private activatedRoute: ActivatedRoute) {
    this.factoryResolver.resolve(this.activatedRoute);
    this.asset$ = this.factoryResolver.assetWithDetailsAndFields$;
  }

  ngOnInit(): void {
    this.notificationsOfAsset$ = this.asset$.pipe(first(),
      mergeMap(asset => this.getFilteredNotificationsOfAsset(asset))
    );
  }

  private getFilteredNotificationsOfAsset(asset: FactoryAssetDetailsWithFields): Observable<Notification[]> {
    return this.notificationService.getNotificationsOfAsset(asset).pipe(
      map(notifications => this.filterNotificationsByStatus(notifications))
    );
  }

  private filterNotificationsByStatus(notifications: Notification[]): Notification[] {
    const status = RouteHelpers.isRouteActive('cleared', this.activatedRoute) ? IFAlertStatus.CLEARED : IFAlertStatus.OPEN;
    return notifications.filter(notification => notification.status === status);
  }
}
