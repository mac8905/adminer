import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestModalOnWaitingComponent } from './request-modal-on-waiting.component';

describe('RequestModalOnWaitingComponent', () => {
  let component: RequestModalOnWaitingComponent;
  let fixture: ComponentFixture<RequestModalOnWaitingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestModalOnWaitingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestModalOnWaitingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
