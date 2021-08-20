import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CareerModalDeleteComponent } from './career-modal-delete.component';

describe('CareerModalDeleteComponent', () => {
  let component: CareerModalDeleteComponent;
  let fixture: ComponentFixture<CareerModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CareerModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CareerModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
