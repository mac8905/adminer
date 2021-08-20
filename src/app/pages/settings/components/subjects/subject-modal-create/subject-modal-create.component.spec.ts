import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { SubjectModalCreateComponent } from './subject-modal-create.component';

describe('SubjectModalCreateComponent', () => {
  let component: SubjectModalCreateComponent;
  let fixture: ComponentFixture<SubjectModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ SubjectModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(SubjectModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
