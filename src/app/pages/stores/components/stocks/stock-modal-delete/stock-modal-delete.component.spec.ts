import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockModalDeleteComponent } from './stock-modal-delete.component';

describe('StockModalDeleteComponent', () => {
  let component: StockModalDeleteComponent;
  let fixture: ComponentFixture<StockModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
