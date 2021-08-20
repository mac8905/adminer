import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectedPracticeModalDeleteComponent } from './directed-practice-modal-delete.component';

describe('DirectedPracticeModalDeleteComponent', () => {
  let component: DirectedPracticeModalDeleteComponent;
  let fixture: ComponentFixture<DirectedPracticeModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectedPracticeModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectedPracticeModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
