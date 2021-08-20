import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectedPracticeModalCreateComponent } from './directed-practice-modal-create.component';

describe('DirectedPracticeModalCreateComponent', () => {
  let component: DirectedPracticeModalCreateComponent;
  let fixture: ComponentFixture<DirectedPracticeModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectedPracticeModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectedPracticeModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
