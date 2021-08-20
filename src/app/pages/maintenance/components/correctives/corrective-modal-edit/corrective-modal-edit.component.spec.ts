import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectiveModalEditComponent } from './corrective-modal-edit.component';

describe('CorrectiveModalEditComponent', () => {
  let component: CorrectiveModalEditComponent;
  let fixture: ComponentFixture<CorrectiveModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectiveModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectiveModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
