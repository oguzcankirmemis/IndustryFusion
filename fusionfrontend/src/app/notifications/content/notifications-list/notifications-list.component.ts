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

import { Component, Input, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ID } from '@datorama/akita';
import { AssetSeriesDetailsResolver } from '../../../resolvers/asset-series-details-resolver.service';
import { OispNotification } from '../../../services/notification.model';

@Component({
  selector: 'app-notifications-list',
  templateUrl: './notifications-list.component.html',
  styleUrls: ['./notifications-list.component.scss']
})
export class NotificationsListComponent implements OnInit, OnDestroy {

  // @Input() status
  @Input() items: OispNotification[];

  titleMapping:
    { [k: string]: string } = { '=0': 'No Open Notification', '=1': '# Open Notification', other: '# Open Notifications' };

  editBarMapping:
    { [k: string]: string } = {
    '=0': 'No Open Notification selected',
    '=1': '# Open Notification selected',
    other: '# Open Notifications selected'
  };

  sortField: string;
  selected: Set<ID> = new Set();

  constructor(
    public route: ActivatedRoute,
    public router: Router,
    public assetSeriesDetailsResolver: AssetSeriesDetailsResolver
  ) {
  }

  ngOnInit() {
    this.assetSeriesDetailsResolver.resolve(this.route.snapshot);
  }

  ngOnDestroy() {
    /*this.assetSeriesDetailsQuery.resetError();*/
  }

  onSort(field: string) {
    this.sortField = field;
  }

  onItemSelect(id: ID) {
    this.selected.add(id);
  }

  onItemDeselect(id: ID) {
    this.selected.delete(id);
  }

  deleteItems() {
    this.selected.forEach(id => {
          this.deleteItem(id);
    });
  }

  deleteItem(id: number | string) {
    console.log(id);
   /* this.assetSeriesService.deleteItem(this.route.snapshot.params.companyId, id).subscribe(
      () => this.selected.clear()
    );*/
  }

  deselectAllItems() {
    this.selected.clear();
  }

  isSelected(id: ID) {
    return this.selected.has(id);
  }
}
