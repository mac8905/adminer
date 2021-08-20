import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockModalEditComponent } from './stock-modal-edit.component';

describe('StockModalEditComponent', () => {
  let component: StockModalEditComponent;
  let fixture: ComponentFixture<StockModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
