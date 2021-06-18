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

import { Component, EventEmitter, OnInit, Output } from '@angular/core';

@Component({
  selector: 'app-trash-button',
  templateUrl: './trash-button.component.html',
  styleUrls: ['./trash-button.component.scss']
})
export class TrashButtonComponent implements OnInit {

  @Output() deleteItem = new EventEmitter<void>();

  constructor() { }

  ngOnInit(): void {
  }

  onClick() {
    this.deleteItem.emit();
  }
}