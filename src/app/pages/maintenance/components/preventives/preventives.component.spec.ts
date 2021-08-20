import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PreventivesComponent } from './preventives.component';

describe('PreventivesComponent', () => {
  let component: PreventivesComponent;
  let fixture: ComponentFixture<PreventivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PreventivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PreventivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
