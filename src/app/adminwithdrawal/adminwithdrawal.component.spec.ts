import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdminwithdrawalComponent } from './adminwithdrawal.component';

describe('AdminwithdrawalComponent', () => {
  let component: AdminwithdrawalComponent;
  let fixture: ComponentFixture<AdminwithdrawalComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdminwithdrawalComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdminwithdrawalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
