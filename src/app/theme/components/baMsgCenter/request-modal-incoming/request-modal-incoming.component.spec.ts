import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RequestModalIncomingComponent } from './request-modal-incoming.component';

describe('RequestModalIncomingComponent', () => {
  let component: RequestModalIncomingComponent;
  let fixture: ComponentFixture<RequestModalIncomingComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RequestModalIncomingComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RequestModalIncomingComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
