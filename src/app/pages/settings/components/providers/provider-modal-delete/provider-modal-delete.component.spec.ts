import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderModalDeleteComponent } from './provider-modal-delete.component';

describe('ProviderModalDeleteComponent', () => {
  let component: ProviderModalDeleteComponent;
  let fixture: ComponentFixture<ProviderModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
