import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ScheduleModalCreateComponent } from './schedule-modal-create.component';

describe('ScheduleModalCreateComponent', () => {
  let component: ScheduleModalCreateComponent;
  let fixture: ComponentFixture<ScheduleModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ScheduleModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ScheduleModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
