import { Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges } from '@angular/core';
import { FactoryAssetDetailsWithFields, AssetModalMode } from '../../../../../store/factory-asset-details/factory-asset-details.model';
import { Asset } from '../../../../../store/asset/asset.model';
import { Room } from '../../../../../store/room/room.model';
import { RoomQuery } from '../../../../../store/room/room.query';
import { FactorySite } from '../../../../../store/factory-site/factory-site.model';
import { FactoryAssetDetails, AssetModalType } from 'src/app/store/factory-asset-details/factory-asset-details.model';
import { DialogService, DynamicDialogRef } from 'primeng/dynamicdialog';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AssetInstantiationComponent } from '../../asset-instantiation/asset-instantiation.component';
import { MenuItem } from 'primeng/api';
import { ConfirmationService } from 'primeng/api';

@Component({
  selector: 'app-assets-list-item',
  templateUrl: './assets-list-item.component.html',
  styleUrls: ['./assets-list-item.component.scss'],
  providers: [DialogService, ConfirmationService]
})
export class AssetsListItemComponent implements OnInit, OnChanges {

  @Input()
  assetWithDetailsAndFields: FactoryAssetDetailsWithFields;
  @Input()
  rooms: Room[];
  @Input()
  allRoomsOfFactorySite: Room[];
  @Input()
  room: Room;
  @Input()
  factorySites: FactorySite[];
  @Input()
  factorySite: FactorySite;
  @Input()
  selected = false;
  @Output()
  assetSelected = new EventEmitter<FactoryAssetDetailsWithFields>();
  @Output()
  assetDeselected = new EventEmitter<FactoryAssetDetailsWithFields>();
  @Output()
  editAssetEvent = new EventEmitter<FactoryAssetDetails>();
  @Output()
  deleteAssetEvent = new EventEmitter<FactoryAssetDetailsWithFields>();

  showStatusCircle = false;
  roomsOfFactorySite: Room[];
  assetDetailsForm: FormGroup;
  ref: DynamicDialogRef;
  menuActions: MenuItem[];


  constructor(
    private roomQuery: RoomQuery,
    private formBuilder: FormBuilder,
    public dialogService: DialogService,
    private confirmationService: ConfirmationService) {
      this.createDetailsAssetForm(this.formBuilder, this.assetWithDetailsAndFields);
      this.menuActions = [
        { label: 'Edit', icon: 'pi pi-fw pi-pencil', command: (_) => { this.showEditDialog(); } },
        { label: 'Assign to room', icon: 'pi pw-fw pi-clone', command: (_) => { this.openAssignRoomDialog(); } },
        { label: 'Delete', icon: 'pi pw-fw pi-trash', command: (_) => { this.showDeleteDialog(); } },
      ];
  }

  ngOnInit(): void {
  }

  ngOnChanges(changes: SimpleChanges) {
    if ((changes.factorySite && this.factorySite)) {
      this.roomsOfFactorySite = this.factorySite.rooms;
    }
  }

  showEditDialog() {
    this.createDetailsAssetForm(this.formBuilder, this.assetWithDetailsAndFields);
    const ref = this.dialogService.open(AssetInstantiationComponent, {
      data: {
        assetDetailsForm: this.assetDetailsForm,
        assetToBeEdited: this.assetWithDetailsAndFields,
        factorySites: this.factorySites,
        factorySite: this.factorySite,
        rooms: this.rooms,
        activeModalType: AssetModalType.customizeAsset,
        activeModalMode: AssetModalMode.editAssetMode
      },
      header: 'General Information',
    });

    ref.onClose.subscribe((assetFormValues: FactoryAssetDetails) => {
      if (assetFormValues) {
        this.editAssetEvent.emit(assetFormValues);
      }
    });
  }

  openAssignRoomDialog() {
    if (this.factorySite) {
      this.showAssignRoomDialog(AssetModalType.roomAssignment, AssetModalMode.editRoomWithPreselecedFactorySiteMode,
        'Room Assignment (' + this.factorySite.name + ')');
    } else {
      this.showAssignRoomDialog(AssetModalType.factorySiteAssignment, AssetModalMode.editRoomForAssetMode,
        'Factory Site Assignment');
    }
  }

  showAssignRoomDialog(assetModalType: AssetModalType, assetModalMode: AssetModalMode, header: string ) {
    this.createDetailsAssetForm(this.formBuilder, this.assetWithDetailsAndFields);
    const ref = this.dialogService.open(AssetInstantiationComponent, {
      data: {
        assetDetailsForm: this.assetDetailsForm,
        assetToBeEdited: this.assetWithDetailsAndFields,
        factorySites: this.factorySites,
        factorySite: this.factorySite,
        rooms: this.rooms,
        activeModalType: assetModalType,
        activeModalMode: assetModalMode
      },
      header
    });

    ref.onClose.subscribe((assetFormValues: FactoryAssetDetails) => {
      if (assetFormValues) {
        this.editAssetEvent.emit(assetFormValues);
      }
    });
  }

  createDetailsAssetForm(formBuilder: FormBuilder, assetWithDetailsAndFields: FactoryAssetDetailsWithFields) {
    const requiredTextValidator = [Validators.required, Validators.minLength(1), Validators.maxLength(255)];
    this.assetDetailsForm = formBuilder.group({
      id: [null],
      roomId: ['', requiredTextValidator],
      name: ['', requiredTextValidator],
      description: [''],
      imageKey: [''],
      manufacturer: ['', requiredTextValidator],
      assetSeriesName: ['', requiredTextValidator],
      category: ['', requiredTextValidator],
      roomName: ['', requiredTextValidator],
      factorySiteName: ['', requiredTextValidator]
    });
    this.assetDetailsForm.patchValue(assetWithDetailsAndFields);
  }

  select() {
    !this.selected ? this.assetSelected.emit(this.assetWithDetailsAndFields) : this.assetDeselected.emit(this.assetWithDetailsAndFields);
  }

  getAssetLink(asset: Asset) {
    if (!asset) { return; }
    if (this.room) {
      return ['assets', asset.id];
    } else if (!this.factorySite) {
      const room: Room = this.roomQuery.getEntity(asset.roomId);
      if (!room) { return; }
      return ['..', 'factorysites', room.factorySiteId, 'rooms', asset.roomId, 'assets', asset.id];
    } else {
      return ['rooms', asset.roomId, 'assets', asset.id];
    }
  }

  showDeleteDialog() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to delete the asset ' + this.assetWithDetailsAndFields.name + '?',
      header: 'Delete Asset Confirmation',
      icon: 'pi pi-exclamation-triangle',
      accept: () => {
        this.onDeleteClick();
      },
      reject: () => {
      }
    });
  }

  onDeleteClick() {
    this.deleteAssetEvent.emit(this.assetWithDetailsAndFields);
  }
}
