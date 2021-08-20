import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticalTypesComponent } from './practical-types.component';

describe('PracticalTypesComponent', () => {
  let component: PracticalTypesComponent;
  let fixture: ComponentFixture<PracticalTypesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticalTypesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticalTypesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
