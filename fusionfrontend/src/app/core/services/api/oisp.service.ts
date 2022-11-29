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

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { EMPTY, Observable, of } from 'rxjs';
import { catchError, map } from 'rxjs/operators';
import { environment } from '../../../../environments/environment';
import { Asset } from '../../store/asset/asset.model';
import { FieldDetails } from '../../store/field-details/field-details.model';
import {
  Aggregator,
  Metrics,
  MetricsWithAggregation,
  OispRequest,
  OispRequestWithAggregation,
  OispResponse,
  PointWithId,
  Sampling,
  Series
} from './oisp.model';
import { KeycloakService } from 'keycloak-angular';
import { OispDeviceQuery } from '../../store/oisp/oisp-device/oisp-device.query';

@Injectable({
  providedIn: 'root'
})
export class OispService {
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };
  private defaultPoints: PointWithId[] = [];

  constructor(
    private http: HttpClient,
    private oispDeviceQuery: OispDeviceQuery,
    private keycloakService: KeycloakService) {
  }

  hasAnyPoints(oispSeries: Series[]): boolean {
    let answer = false;
    oispSeries.forEach(series => {
      answer = answer || (series.points.length > 0);
    });
    return answer;
  }

  getOispPoints(path: string, request: OispRequest, allFields: boolean, useNameAsId = false):
    Observable<PointWithId[]> {
    if (request.metrics.length < 1) {
      return of(this.defaultPoints);
    }
    return this.http.post<OispResponse>(`${environment.oispApiUrlPrefix}/${path}`, request, this.httpOptions)
      .pipe(
        catchError(() => {
          console.error('[oisp service] caught error while searching for oispPoints');
          return EMPTY;
        }),
        map((entity) => {
          if (entity.series && this.hasAnyPoints(entity.series)) {
            if (allFields) {
              // returns the last value for each field
              const points = entity.series.map((series) => ({
                id: useNameAsId ? series.componentName : series.componentId,
                ...series.points.slice(-1)[0]
              }));
              return points;
            } else if (!allFields) {
              // returns all values for one field
              const seriesId = useNameAsId ? entity.series[0].componentName : entity.series[0].componentId;
              const points = entity.series[0].points
                .map((point) => ({ id: seriesId, ts: point.ts, value: point.value }));
              return points;
            }
          } else {
            return this.defaultPoints;
          }
        }));
  }

  getValuesOfSingleField(asset: Asset, field: FieldDetails, secondsInPast: number, maxPoints?: number): Observable<PointWithId[]> {
    const path = `accounts/${this.getOispAccountId()}/data/search`;
    let oispPoints$: Observable<PointWithId[]>;
    if (!maxPoints) {
      let metrics: Metrics;
      metrics = ({
        id: this.oispDeviceQuery.mapExternalNameOFieldInstanceToComponentId(asset.externalName, field.externalName),
        op: 'none'
      });
      const request: OispRequest = {
        from: -secondsInPast,
        targetFilter: { deviceList: [asset.externalName] },
        metrics: [metrics]
      };
      oispPoints$ = this.getOispPoints(path, request, false);
    } else {
      let metricsWithAggregation: MetricsWithAggregation;
      const myAggregator: Aggregator = ({ name: 'avg' });
      metricsWithAggregation = ({
        id: this.oispDeviceQuery.mapExternalNameOFieldInstanceToComponentId(asset.externalName,
          field.externalName),
        op: 'none', aggregator: myAggregator
      });
      const request: OispRequestWithAggregation = {
        from: -secondsInPast,
        maxItems: maxPoints,
        targetFilter: { deviceList: [asset.externalName] },
        metrics: [metricsWithAggregation]
      };
      oispPoints$ = this.getOispPoints(path, request, false);
    }
    return oispPoints$;
  }

  getValuesOfSingleFieldByDates(asset: Asset,
                                field: FieldDetails,
                                fromDate: number,
                                toDate: number,
                                maxPoints: number,
                                samplingUnit?: string,
                                samplingValue?: number): Observable<PointWithId[]> {
    const path = `accounts/${this.getOispAccountId()}/data/search`;
    let metricsWithAggregation: MetricsWithAggregation;
    if (samplingUnit) {
      const mySampling: Sampling = ({ unit: samplingUnit, value: samplingValue });
      const myAggregator: Aggregator = ({ name: 'avg', sampling: mySampling });
      metricsWithAggregation = ({
        id: this.oispDeviceQuery.mapExternalNameOFieldInstanceToComponentId(asset.externalName,
          field.externalName),
        op: 'none', aggregator: myAggregator
      });
      const request: OispRequestWithAggregation = {
        from: fromDate,
        to: toDate,
        targetFilter: { deviceList: [asset.externalName] },
        metrics: [metricsWithAggregation]
      };
      return this.getOispPoints(path, request, false);
    } else {
      const myAggregator: Aggregator = ({ name: 'avg' });
      metricsWithAggregation = ({
        id: this.oispDeviceQuery.mapExternalNameOFieldInstanceToComponentId(asset.externalName,
          field.externalName),
        op: 'none', aggregator: myAggregator
      });
      const request: OispRequestWithAggregation = {
        from: fromDate,
        to: toDate,
        maxItems: maxPoints,
        targetFilter: { deviceList: [asset.externalName] },
        metrics: [metricsWithAggregation]
      };
      return this.getOispPoints(path, request, false);
    }
  }

  private getOispAccountId(): string {
    const token = (this.keycloakService.getKeycloakInstance().tokenParsed as any);
    let oispAccountId = '';

    if (token.accounts && token.accounts.length > 0) {
      oispAccountId = token.accounts[0].id;
    } else {
      console.warn('cannot retrieve OISP accountId, subsequent calls to OISP will hence most likely fail!');
    }

    return oispAccountId;
  }
}
