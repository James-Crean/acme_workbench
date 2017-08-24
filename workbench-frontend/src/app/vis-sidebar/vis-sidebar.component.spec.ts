import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisSidebarComponent } from './vis-sidebar.component';

describe('VisSidebarComponent', () => {
  let component: VisSidebarComponent;
  let fixture: ComponentFixture<VisSidebarComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisSidebarComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisSidebarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
