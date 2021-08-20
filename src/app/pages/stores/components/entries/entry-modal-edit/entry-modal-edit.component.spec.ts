import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryModalEditComponent } from './entry-modal-edit.component';

describe('EntryModalEditComponent', () => {
  let component: EntryModalEditComponent;
  let fixture: ComponentFixture<EntryModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
