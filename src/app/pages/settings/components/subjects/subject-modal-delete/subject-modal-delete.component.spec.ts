import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectModalDeleteComponent } from './subject-modal-delete.component';

describe('SubjectModalDeleteComponent', () => {
  let component: SubjectModalDeleteComponent;
  let fixture: ComponentFixture<SubjectModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
