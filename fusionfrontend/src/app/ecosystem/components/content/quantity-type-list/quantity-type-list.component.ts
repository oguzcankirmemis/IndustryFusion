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

import { Component, OnDestroy, OnInit } from '@angular/core';
import { QuantityTypeQuery } from '../../../../store/quantity-type/quantity-type.query';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { QuantityTypeDialogComponent } from '../quantity-type-dialog/quantity-type-dialog.component';
import { DialogType } from '../../../../common/models/dialog-type.model';
import { Observable } from 'rxjs';
import { QuantityType } from '../../../../store/quantity-type/quantity-type.model';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-quantity-type-list',
  templateUrl: './quantity-type-list.component.html',
  styleUrls: ['./quantity-type-list.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class QuantityTypeListComponent implements OnInit, OnDestroy {

  quantityTypes$: Observable<QuantityType[]>
  quantityTypes: QuantityType[];
  displayedQuantityTypes: QuantityType[];
  quantityTypesSearchedByName: QuantityType[];
  quantityTypesSearchedByDescription: QuantityType[];

  activeListItem: QuantityType;

  public titleMapping:
    { [k: string]: string } = { '=0': 'No Quantity Types', '=1': '# Quantity Type', other: '# Quantity Types' };

  public ref: DynamicDialogRef;

  constructor(
    public quantityQuery: QuantityTypeQuery,
    public dialogService: DialogService,
    public confirmationService: ConfirmationService) {
  }

  ngOnInit() {
    this.quantityTypes$ = this.quantityQuery.selectAll();
    this.quantityTypes$.subscribe(quantityTypes => {
      this.quantityTypes = this.displayedQuantityTypes = this.quantityTypesSearchedByName
        = this.quantityTypesSearchedByDescription = quantityTypes;
    });
  }

  ngOnDestroy() {
    if (this.ref) {
      this.ref.close();
    }
    this.quantityQuery.resetError();
  }

  setActiveRow(quantityType?: QuantityType) {
    if (quantityType) {
      this.activeListItem = quantityType;
    }
  }

  searchQuantityTypesByName(event?: QuantityType[]): void {
    this.quantityTypesSearchedByName = event;
    this.updateDisplayedQuantityTypes();
  }

  searchQuantityTypesByDescription(event?: QuantityType[]): void {
    this.quantityTypesSearchedByDescription = event;
    this.updateDisplayedQuantityTypes();
  }

  private updateDisplayedQuantityTypes(): void {
    this.displayedQuantityTypes = this.quantityTypes;
    this.displayedQuantityTypes = this.quantityTypesSearchedByName.filter(quantityType =>
      this.quantityTypesSearchedByDescription.includes(quantityType));
  }

  showCreateDialog() {
    this.ref = this.dialogService.open(QuantityTypeDialogComponent, {
      data: {
        quantityType: null,
        type: DialogType.CREATE
      },
      header: `Create new Quantity Type`,
    });
  }

  public showEditDialog() {
    this.ref = this.dialogService.open(QuantityTypeDialogComponent, {
      data: {
        quantityType: this.activeListItem,
        type: DialogType.EDIT
      },
      header: `Edit Quantity Type`,
    });
  }

  showDeleteDialog() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the Quantity Type ' + this.activeListItem.name + '?',
      header: 'Delete Quantity Type Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.deleteQuantityType();
      },
      reject: () => {
      }
    });
  }

  deleteQuantityType() {
  }
}
