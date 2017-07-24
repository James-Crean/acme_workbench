import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisManagerComponent } from './vis-manager.component';

describe('VisManagerComponent', () => {
  let component: VisManagerComponent;
  let fixture: ComponentFixture<VisManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
