import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { LaboratoryModalCreateComponent } from './laboratory-modal-create.component';

describe('LaboratoryModalCreateComponent', () => {
  let component: LaboratoryModalCreateComponent;
  let fixture: ComponentFixture<LaboratoryModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ LaboratoryModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(LaboratoryModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
