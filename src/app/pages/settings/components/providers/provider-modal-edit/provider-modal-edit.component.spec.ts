import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProviderModalEditComponent } from './provider-modal-edit.component';

describe('ProviderModalEditComponent', () => {
  let component: ProviderModalEditComponent;
  let fixture: ComponentFixture<ProviderModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProviderModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProviderModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
