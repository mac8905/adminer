import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectiveModalDeleteComponent } from './corrective-modal-delete.component';

describe('CorrectiveModalDeleteComponent', () => {
  let component: CorrectiveModalDeleteComponent;
  let fixture: ComponentFixture<CorrectiveModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectiveModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectiveModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
