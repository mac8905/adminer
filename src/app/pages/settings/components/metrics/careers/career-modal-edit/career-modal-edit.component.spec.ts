import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerModalEditComponent } from './career-modal-edit.component';

describe('CareerModalEditComponent', () => {
  let component: CareerModalEditComponent;
  let fixture: ComponentFixture<CareerModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
