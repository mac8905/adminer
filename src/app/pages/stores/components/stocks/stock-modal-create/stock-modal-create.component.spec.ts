import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockModalCreateComponent } from './stock-modal-create.component';

describe('StockModalCreateComponent', () => {
  let component: StockModalCreateComponent;
  let fixture: ComponentFixture<StockModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
