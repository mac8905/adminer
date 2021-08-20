import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleModalEditComponent } from './schedule-modal-edit.component';

describe('ScheduleModalEditComponent', () => {
  let component: ScheduleModalEditComponent;
  let fixture: ComponentFixture<ScheduleModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
