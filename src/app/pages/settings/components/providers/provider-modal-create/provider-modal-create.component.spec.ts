import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderModalCreateComponent } from './provider-modal-create.component';

describe('ProviderModalCreateComponent', () => {
  let component: ProviderModalCreateComponent;
  let fixture: ComponentFixture<ProviderModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
