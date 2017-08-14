import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FilePermissionsModalComponent } from './file-permissions-modal.component';

describe('FilePermissionsModalComponent', () => {
  let component: FilePermissionsModalComponent;
  let fixture: ComponentFixture<FilePermissionsModalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FilePermissionsModalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FilePermissionsModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
