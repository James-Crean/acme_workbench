import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DatasetCollectionComponent } from './dataset-collection.component';

describe('DatasetCollectionComponent', () => {
  let component: DatasetCollectionComponent;
  let fixture: ComponentFixture<DatasetCollectionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DatasetCollectionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DatasetCollectionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
