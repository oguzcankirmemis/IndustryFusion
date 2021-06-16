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
import { FieldTarget, FieldType } from '../../../../store/field-target/field-target.model';
import { ActivatedRoute } from '@angular/router';
import { AssetTypeTemplate } from '../../../../store/asset-type-template/asset-type-template.model';
import { AssetTypeTemplateComposedQuery } from '../../../../store/composed/asset-type-template-composed.query';
import { FieldTargetService } from '../../../../store/field-target/field-target.service';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { AssetTypeTemplateDialogPublishComponent } from '../../content/asset-type-template/asset-type-template-dialog/asset-type-template-dialog-publish/asset-type-template-dialog-publish.component';
import { AssetTypeTemplateService } from '../../../../store/asset-type-template/asset-type-template.service';
import { AssetTypeTemplateDialogUpdateComponent } from '../../content/asset-type-template/asset-type-template-dialog/asset-type-template-update-dialog/asset-type-template-dialog-update.component';
import { AssetTypeTemplateWizardMainComponent } from '../../content/asset-type-template/asset-type-template-wizard/asset-type-template-wizard-main/asset-type-template-wizard-main.component';
import { EcoSystemManagerResolver } from '../../../services/ecosystem-resolver.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-asset-type-template-page',
  templateUrl: './asset-type-template-page.component.html',
  styleUrls: ['./asset-type-template-page.component.scss']
})
export class AssetTypeTemplatePageComponent implements OnInit {

  public assetTypeTemplate: AssetTypeTemplate;
  public metrics: FieldTarget[];
  public attributes: FieldTarget[];
  private publishDialogRef: DynamicDialogRef;
  private updateWizardRef: DynamicDialogRef;
  private warningDialogRef: DynamicDialogRef;

  public FieldType = FieldType;

  constructor(private assetTypeTemplateComposedQuery: AssetTypeTemplateComposedQuery,
              private assetTypeTemplateService: AssetTypeTemplateService,
              private fieldTargetService: FieldTargetService,
              private ecoSystemManagerResolver: EcoSystemManagerResolver,
              private dialogService: DialogService,
              public route: ActivatedRoute) { }

  ngOnInit(): void {
    this.metrics = [];
    this.attributes = [];

    const assetTypeTemplateId =  Number.parseInt(this.route.snapshot.paramMap.get('assetTypeTemplateId'), 10);
    if (assetTypeTemplateId) {
      this.fieldTargetService.getItemsByAssetTypeTemplate(assetTypeTemplateId).subscribe(() =>
        this.assetTypeTemplateComposedQuery.selectAssetTypeTemplate(assetTypeTemplateId)
          .subscribe(assetTypeTemplate => this.updateAssetTypeTemplate(assetTypeTemplate)));
    }

    this.assetTypeTemplateService.setActive(assetTypeTemplateId);
    this.ecoSystemManagerResolver.resolve(this.route);
  }

  private updateAssetTypeTemplate(assetTypeTemplate: AssetTypeTemplate) {
    this.assetTypeTemplate = assetTypeTemplate;
    this.metrics = this.getMetrics();
    this.attributes = this.getAttributes();
  }

  private getMetrics(): FieldTarget[] {
    return this.assetTypeTemplate.fieldTargets?.filter((field) => field.fieldType === FieldType.METRIC);
  }

  private getAttributes(): FieldTarget[] {
    return this.assetTypeTemplate.fieldTargets?.filter((field) => field.fieldType === FieldType.ATTRIBUTE);
  }

  onUpdate() {
    this.warningDialogRef = this.dialogService.open(AssetTypeTemplateDialogUpdateComponent, { width: '60%' } );
    this.warningDialogRef.onClose.subscribe((callUpdateWizard: boolean) => {
        if (callUpdateWizard) {
          this.showUpdateWizard();
        }
    });
  }

  onPublish() {
    this.publishDialogRef = this.dialogService.open(AssetTypeTemplateDialogPublishComponent,
      {
        header: `Publish ${this.assetTypeTemplate.name}?`,
        data: { assetTypeTemplate: this.assetTypeTemplate },
        width: '70%',
      }
    );
    this.publishDialogRef.onClose.subscribe((assetTypeTemplateForm: FormGroup) =>
      this.onClosePublishDialog(assetTypeTemplateForm));
  }

  private onClosePublishDialog(assetTypeTemplateForm: FormGroup) {
    this.publishAssetTypeTemplate(assetTypeTemplateForm);
  }

  private showUpdateWizard() {
    this.updateWizardRef = this.dialogService.open(AssetTypeTemplateWizardMainComponent,
      {
        data: { assetTypeTemplate: this.assetTypeTemplate, isEditing: true },
        header: 'Asset Type Template Editor',
        width: '70%',
      }
    );
    this.updateWizardRef.onClose.subscribe((assetTypeTemplateForm: FormGroup) =>
      this.onCloseUpdateWizard(assetTypeTemplateForm));
  }

  private onCloseUpdateWizard(assetTypeTemplateForm: FormGroup) {
    this.publishAssetTypeTemplate(assetTypeTemplateForm);
  }

  private publishAssetTypeTemplate(assetTypeTemplateForm: FormGroup) {
    if (assetTypeTemplateForm && assetTypeTemplateForm.get('wasPublished')?.value) {
      this.assetTypeTemplate.published = assetTypeTemplateForm.get('published')?.value;
      this.assetTypeTemplate.publishedDate = assetTypeTemplateForm.get('publishedDate')?.value;
      this.assetTypeTemplate.publishedVersion = assetTypeTemplateForm.get('publishedVersion')?.value;
      this.assetTypeTemplateService.editItem(this.assetTypeTemplate.id, this.assetTypeTemplate).subscribe();
    }
  }
}
