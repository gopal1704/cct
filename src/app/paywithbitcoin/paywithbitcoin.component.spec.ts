import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PaywithbitcoinComponent } from './paywithbitcoin.component';

describe('PaywithbitcoinComponent', () => {
  let component: PaywithbitcoinComponent;
  let fixture: ComponentFixture<PaywithbitcoinComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PaywithbitcoinComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PaywithbitcoinComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
