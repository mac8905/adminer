import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PracticeModalOnWaitingComponent } from './practice-modal-on-waiting.component';

describe('PracticeModalOnWaitingComponent', () => {
  let component: PracticeModalOnWaitingComponent;
  let fixture: ComponentFixture<PracticeModalOnWaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PracticeModalOnWaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PracticeModalOnWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
