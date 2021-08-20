import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalTypeModalCreateComponent } from './practical-type-modal-create.component';

describe('PracticalTypeModalCreateComponent', () => {
  let component: PracticalTypeModalCreateComponent;
  let fixture: ComponentFixture<PracticalTypeModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticalTypeModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalTypeModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
