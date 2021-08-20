import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModalDeleteComponent } from './profile-modal-delete.component';

describe('ProfileModalDeleteComponent', () => {
  let component: ProfileModalDeleteComponent;
  let fixture: ComponentFixture<ProfileModalDeleteComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileModalDeleteComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileModalDeleteComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
