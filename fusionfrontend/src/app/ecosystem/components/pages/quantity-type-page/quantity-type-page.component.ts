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
import { ActivatedRoute } from '@angular/router';
import { EcoSystemManagerResolver } from '../../../services/ecosystem-resolver.service';
import { QuantityTypeQuery } from '../../../../store/quantity-type/quantity-type.query';
import { Observable } from 'rxjs';
import { QuantityType } from '../../../../store/quantity-type/quantity-type.model';
import { QuantityTypeService } from '../../../../store/quantity-type/quantity-type.service';
import { QuantityTypesComposedQuery } from '../../../../store/composed/quantity-types-composed.query';
import { Unit } from '../../../../store/unit/unit.model';

@Component({
  selector: 'app-quantity-type-page',
  templateUrl: './quantity-type-page.component.html',
  styleUrls: ['./quantity-type-page.component.scss']
})
export class QuantityTypePageComponent implements OnInit {

  isLoading$: Observable<boolean>;
  quantityType$: Observable<QuantityType>;
  units$: Observable<Unit[]>;

  constructor(private quantityTypeQuery: QuantityTypeQuery,
              private quantityTypeService: QuantityTypeService,
              private quantityTypesComposedQuery: QuantityTypesComposedQuery,
              private activatedRoute: ActivatedRoute,
              private ecoSystemManagerResolver: EcoSystemManagerResolver) { }

  ngOnInit(): void {
    this.isLoading$ = this.quantityTypeQuery.selectLoading();
    this.resolve(this.activatedRoute);
    this.ecoSystemManagerResolver.resolve(this.activatedRoute);
  }

  private resolve(activatedRoute: ActivatedRoute) {
    const quantityTypeId = activatedRoute.snapshot.paramMap.get('quantitytypeId');
    if (quantityTypeId != null) {
      this.quantityTypeService.setActive(quantityTypeId);
      this.quantityType$ = this.quantityTypeQuery.selectActive();
      this.units$ = this.quantityTypesComposedQuery.selectUnitsOfQuantityType(quantityTypeId);
    }
  }
}
