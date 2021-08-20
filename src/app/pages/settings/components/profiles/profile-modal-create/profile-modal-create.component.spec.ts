import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ProfileModalCreateComponent } from './profile-modal-create.component';

describe('ProfileModalCreateComponent', () => {
  let component: ProfileModalCreateComponent;
  let fixture: ComponentFixture<ProfileModalCreateComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ProfileModalCreateComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ProfileModalCreateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
