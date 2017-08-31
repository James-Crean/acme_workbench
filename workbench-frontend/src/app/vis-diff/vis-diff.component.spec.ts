import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisDiffComponent } from './vis-diff.component';

describe('VisDiffComponent', () => {
  let component: VisDiffComponent;
  let fixture: ComponentFixture<VisDiffComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisDiffComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisDiffComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
