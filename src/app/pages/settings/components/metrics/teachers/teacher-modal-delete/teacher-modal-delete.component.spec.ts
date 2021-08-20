import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TeacherModalDeleteComponent } from './teacher-modal-delete.component';

describe('TeacherModalDeleteComponent', () => {
  let component: TeacherModalDeleteComponent;
  let fixture: ComponentFixture<TeacherModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TeacherModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TeacherModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
