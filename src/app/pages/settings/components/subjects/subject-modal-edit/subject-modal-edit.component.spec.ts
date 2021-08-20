import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectModalEditComponent } from './subject-modal-edit.component';

describe('SubjectModalEditComponent', () => {
  let component: SubjectModalEditComponent;
  let fixture: ComponentFixture<SubjectModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
