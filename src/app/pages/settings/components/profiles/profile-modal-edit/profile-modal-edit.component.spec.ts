import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModalEditComponent } from './profile-modal-edit.component';

describe('ProfileModalEditComponent', () => {
  let component: ProfileModalEditComponent;
  let fixture: ComponentFixture<ProfileModalEditComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileModalEditComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileModalEditComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
