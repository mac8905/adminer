import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectiveModalCreateComponent } from './corrective-modal-create.component';

describe('CorrectiveModalCreateComponent', () => {
  let component: CorrectiveModalCreateComponent;
  let fixture: ComponentFixture<CorrectiveModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectiveModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectiveModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
