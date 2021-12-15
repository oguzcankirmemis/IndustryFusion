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
import { Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { AlertaAlert } from '../store/oisp/alerta-alert/alerta-alert.model';
import { AlertaAlertService } from '../store/oisp/alerta-alert/alerta-alert.service';

@Injectable({ providedIn: 'root' })
export class OispAlertResolver implements Resolve<AlertaAlert[]> {
  constructor(private alertaAlertService: AlertaAlertService) { }

  resolve(): Observable<AlertaAlert[]> {
    return this.alertaAlertService.getItems();
  }
}
