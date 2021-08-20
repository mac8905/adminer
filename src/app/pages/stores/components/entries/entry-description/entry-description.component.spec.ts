import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EntryDescriptionComponent } from './entry-description.component';

describe('EntryDescriptionComponent', () => {
  let component: EntryDescriptionComponent;
  let fixture: ComponentFixture<EntryDescriptionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EntryDescriptionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EntryDescriptionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
