import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RunManagerComponent } from './run-manager.component';

describe('RunManagerComponent', () => {
  let component: RunManagerComponent;
  let fixture: ComponentFixture<RunManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RunManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RunManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
