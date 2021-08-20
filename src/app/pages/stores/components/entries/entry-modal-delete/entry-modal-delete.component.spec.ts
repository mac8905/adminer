import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryModalDeleteComponent } from './entry-modal-delete.component';

describe('EntryModalDeleteComponent', () => {
  let component: EntryModalDeleteComponent;
  let fixture: ComponentFixture<EntryModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
