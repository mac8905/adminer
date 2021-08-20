import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerModalCreateComponent } from './career-modal-create.component';

describe('CareerModalCreateComponent', () => {
  let component: CareerModalCreateComponent;
  let fixture: ComponentFixture<CareerModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
