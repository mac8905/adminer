import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeModalInProcessComponent } from './practice-modal-in-process.component';

describe('PracticeModalInProcessComponent', () => {
  let component: PracticeModalInProcessComponent;
  let fixture: ComponentFixture<PracticeModalInProcessComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeModalInProcessComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeModalInProcessComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
