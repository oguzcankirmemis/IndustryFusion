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
import { ID } from '@datorama/akita';
import { FactorySite } from 'src/app/store/factory-site/factory-site.model';
import { Asset } from 'src/app/store/asset/asset.model';
import { Room } from 'src/app/store/room/room.model';
import { FactorySiteQuery } from 'src/app/store/factory-site/factory-site.query';
import { CompanyQuery } from 'src/app/store/company/company.query';
import { RoomService } from 'src/app/store/room/room.service';
import { AssetQuery } from 'src/app/store/asset/asset.query';
import { ActivatedRoute } from '@angular/router';
import { FactoryResolver } from 'src/app/factory/services/factory-resolver.service';
import { AssetService } from 'src/app/store/asset/asset.service';
import { Company } from 'src/app/store/company/company.model';
import { RoomQuery } from '../../../../store/room/room.query';
import { FactoryAssetDetailsService } from '../../../../store/factory-asset-details/factory-asset-details.service';

@Component({
  selector: 'app-rooms-page',
  templateUrl: './rooms-page.component.html',
  styleUrls: ['./rooms-page.component.scss']
})
export class RoomsPageComponent implements OnInit {
  isLoading$: Observable<boolean>;
  company$: Observable<Company>;
  assets$: Observable<Asset[]>;
  factorySite$: Observable<FactorySite>;
  allRoomsOfFactorySite$: Observable<Room[]>;
  activeRoom$: Observable<Room>;

  companyId: ID;
  factorySiteId: ID;
  selectedRoomId: ID;

  editRoomModal = false;
  assignToRoomModal = false;
  createRoomModal = false;

  constructor(private factorySiteQuery: FactorySiteQuery,
              private companyQuery: CompanyQuery,
              private roomService: RoomService,
              private roomQuery: RoomQuery,
              private assetQuery: AssetQuery,
              private factoryResolver: FactoryResolver,
              private activatedRoute: ActivatedRoute,
              private assetDetailsService: FactoryAssetDetailsService,
              private assetService: AssetService) { }

  ngOnInit() {
    this.isLoading$ = this.companyQuery.selectLoading();
    this.factoryResolver.resolve(this.activatedRoute);
    this.company$ = this.factoryResolver.company$;
    this.factorySite$ = this.factoryResolver.factorySite$;
    this.allRoomsOfFactorySite$ = this.factoryResolver.allRoomsOfFactorySite$;
    this.assets$ = this.factoryResolver.assets$;
    this.companyId = this.companyQuery.getActiveId();
    this.factorySiteId = this.factorySiteQuery.getActiveId();
  }

  deleteRoom(roomId: ID) {
    const companyId = this.companyQuery.getActiveId();
    const factorySiteId = this.factorySiteQuery.getActiveId();
    this.roomService.deleteRoom(companyId, factorySiteId, roomId)
      .subscribe(() => {
        console.log('[rooms-page.component] Delete request successful', roomId);
      });
  }

  editRoom(roomId: ID) {
    this.roomService.setActive(roomId);
    this.activeRoom$ = this.roomQuery.selectActive();
    this.editRoomModal = true;
  }

  closeEditModal($event: Room) {
    if ($event) {
      this.roomService.updateRoom(this.companyQuery.getActiveId(), $event)
        .subscribe(data => {
          console.log('[rooms-page.component] Patch request successful', data);
        });
      this.assetDetailsService.updateRoomNames($event);
    }
    this.editRoomModal = false;
  }

  closeCreateModal($event: Room) {
    if ($event) {
      this.roomService.createRoom(this.companyId, $event)
        .subscribe(data => {
          console.log('[rooms-page.component] Post request successful', data);
        });
    }
    this.createRoomModal = false;
  }

  openAssignAssetModal(roomId: ID) {
    this.assignToRoomModal = true;
    this.selectedRoomId = roomId;
  }

  assignToRoom(assetId: ID) {
    const theAsset = this.assetQuery.getEntity(assetId);
    this.assetService.assignAssetToRoom(this.companyId, this.factorySiteId, this.selectedRoomId, theAsset.roomId, assetId)
      .subscribe(
        asset => { console.log('[rooms-page.component] asset: ' + asset.name + ' assigned'); },
        error => { console.log(error); }
      );
    this.assetDetailsService.updateRoom(assetId, this.selectedRoomId);
    this.assignToRoomModal = false;
  }
}
