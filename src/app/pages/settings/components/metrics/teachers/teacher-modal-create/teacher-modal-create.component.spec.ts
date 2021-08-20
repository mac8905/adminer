import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherModalCreateComponent } from './teacher-modal-create.component';

describe('TeacherModalCreateComponent', () => {
  let component: TeacherModalCreateComponent;
  let fixture: ComponentFixture<TeacherModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
