import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WallettransferotpComponent } from './wallettransferotp.component';

describe('WallettransferotpComponent', () => {
  let component: WallettransferotpComponent;
  let fixture: ComponentFixture<WallettransferotpComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WallettransferotpComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WallettransferotpComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
