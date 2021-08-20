import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleModalDeleteComponent } from './schedule-modal-delete.component';

describe('ScheduleModalDeleteComponent', () => {
  let component: ScheduleModalDeleteComponent;
  let fixture: ComponentFixture<ScheduleModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
