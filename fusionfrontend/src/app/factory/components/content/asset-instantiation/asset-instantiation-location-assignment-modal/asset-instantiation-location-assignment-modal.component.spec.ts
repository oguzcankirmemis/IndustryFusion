import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';

import { AssetInstantiationLocationAssignmentModalComponent } from './asset-instantiation-location-assignment-modal.component';

describe('AssetInstantiationLocationAssignmentModalComponent', () => {
  let component: AssetInstantiationLocationAssignmentModalComponent;
  let fixture: ComponentFixture<AssetInstantiationLocationAssignmentModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [ AssetInstantiationLocationAssignmentModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AssetInstantiationLocationAssignmentModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
