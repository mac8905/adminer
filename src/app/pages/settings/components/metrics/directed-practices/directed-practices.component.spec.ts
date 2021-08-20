import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DirectedPracticesComponent } from './directed-practices.component';

describe('DirectedPracticesComponent', () => {
  let component: DirectedPracticesComponent;
  let fixture: ComponentFixture<DirectedPracticesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DirectedPracticesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DirectedPracticesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
