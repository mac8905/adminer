import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherModalEditComponent } from './teacher-modal-edit.component';

describe('TeacherModalEditComponent', () => {
  let component: TeacherModalEditComponent;
  let fixture: ComponentFixture<TeacherModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
