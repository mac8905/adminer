import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CorrectivesComponent } from './correctives.component';

describe('CorrectivesComponent', () => {
  let component: CorrectivesComponent;
  let fixture: ComponentFixture<CorrectivesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CorrectivesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CorrectivesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
