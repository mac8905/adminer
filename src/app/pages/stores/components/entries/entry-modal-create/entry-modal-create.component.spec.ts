import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryModalCreateComponent } from './entry-modal-create.component';

describe('EntryModalCreateComponent', () => {
  let component: EntryModalCreateComponent;
  let fixture: ComponentFixture<EntryModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
