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
import { OispService } from '../../../services/oisp.service';
import { Rule, RuleResetType, RuleStatus, RuleType, } from '../../../services/oisp.model';
import { RuleStatusUtil } from '../../util/rule-status-util';
import { FormArray, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-fusion-applet-editor',
  templateUrl: './fusion-applet-editor.component.html',
  styleUrls: ['./fusion-applet-editor.component.scss']
})
export class FusionAppletEditorComponent implements OnInit {
  RuleResetType = RuleResetType;

  rule: Rule;
  ruleGroup: FormGroup;
  assets: any[];
  isStatusActive = false;

  constructor(
    activatedRoute: ActivatedRoute,
    private oispService: OispService,
    public ruleStatusUtil: RuleStatusUtil,
    formBuilder: FormBuilder,
    private confirmationService: ConfirmationService
  ) {
    this.ruleGroup = formBuilder.group({
      id: [],
      externalId: [],
      name: [],
      description: [],
      owner: [],
      naturalLanguage: [],
      type: [RuleType.Regular, [Validators.required]],
      resetType: [],
      priority: [],
      status: [, [Validators.required]],
      synchronizationStatus: [],
      population: [],
      actions: new FormArray([], [Validators.required, Validators.minLength(1)])
    });
    this.ruleGroup.get('status').valueChanges.subscribe(status => {
      this.isStatusActive = status === RuleStatus.Active;
    });
    const fusionAppletId = activatedRoute.snapshot.parent.paramMap.get('fusionAppletId');
    this.oispService.getRule(fusionAppletId).subscribe(rule => {
      this.rule = rule;
      this.ruleGroup.patchValue(this.rule);
    });
  }

  ngOnInit(): void {
  }

  changeStatus(isActivating: boolean) {
    let status: RuleStatus.Active | RuleStatus.OnHold;
    let prefix = '';
    if (isActivating) {
      status = RuleStatus.Active;
    } else {
      status = RuleStatus.OnHold;
      prefix = 'de';
    }
    this.confirmationService.confirm({
      message: `Are you sure that you want to ${prefix}activate this applet? All unsaved Changes will be lost!`,
      accept: () => this.sendStatusChange(status),
      reject: () => this.ruleGroup.get('status').setValue(this.rule.status),
      rejectVisible: true
    });
  }

  private sendStatusChange(status: RuleStatus.OnHold | RuleStatus.Active) {
    this.oispService.setRuleStatus(this.rule.id, status).subscribe(rule => {
      this.rule = rule;
      this.ruleGroup.patchValue(this.rule);
    });
  }

  setResetTypeAutomatic(isAutomatic: boolean) {
    if (isAutomatic) {
      this.ruleGroup.get('resetType').setValue(RuleResetType.Automatic);
    } else {
      this.ruleGroup.get('resetType').setValue(RuleResetType.Manual);
    }
  }

  save() {
    this.rule = this.ruleGroup.getRawValue();
    this.oispService.updateRule(this.rule.id, this.rule).subscribe(rule => this.rule = rule);
  }

  log($event) {
    console.log($event);
  }
}
