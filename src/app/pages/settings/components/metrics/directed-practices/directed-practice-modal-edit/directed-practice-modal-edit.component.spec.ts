import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectedPracticeModalEditComponent } from './directed-practice-modal-edit.component';

describe('DirectedPracticeModalEditComponent', () => {
  let component: DirectedPracticeModalEditComponent;
  let fixture: ComponentFixture<DirectedPracticeModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectedPracticeModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectedPracticeModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
