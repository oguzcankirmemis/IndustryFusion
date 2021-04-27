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

import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

import { BaseListItemComponent } from '../base/base-list-item/base-list-item.component';
import { AssetType } from '../../../../store/asset-type/asset-type.model';
import { AssetTypeService } from '../../../../store/asset-type/asset-type.service';
import {AssetTypesComposedQuery} from "../../../../store/composed/asset-types-composed.query";

@Component({
  selector: 'app-asset-type-list-item',
  templateUrl: './asset-type-list-item.component.html',
  styleUrls: ['./asset-type-list-item.component.scss']
})
export class AssetTypeListItemComponent extends BaseListItemComponent implements OnInit {

  @Input()
  item: AssetType;
  templateCount: number;
  assetSeriesCount: number;
  assetInstancesCount: number;

  constructor(public route: ActivatedRoute,
              public router: Router,
              public assetTypeService: AssetTypeService,
              private assetTypesComposedQuery: AssetTypesComposedQuery) {
    super(route, router, assetTypeService);
  }

  ngOnInit() {
    // TODO: Call resolver?
    // TODO: Fix: Call via URL yields no data
    this.assetTypesComposedQuery.selectAssetTypeWithTemplateCount(this.item.id).subscribe(x => this.templateCount = x.templateCount);
    this.assetSeriesCount = 9999;
    this.assetInstancesCount = 9999;
  }
}
