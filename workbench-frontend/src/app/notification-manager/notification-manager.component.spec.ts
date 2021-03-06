import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NotificationManagerComponent } from './notification-manager.component';

describe('NotificationManagerComponent', () => {
  let component: NotificationManagerComponent;
  let fixture: ComponentFixture<NotificationManagerComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NotificationManagerComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NotificationManagerComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
