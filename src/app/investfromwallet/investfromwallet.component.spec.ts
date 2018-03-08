import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestfromwalletComponent } from './investfromwallet.component';

describe('InvestfromwalletComponent', () => {
  let component: InvestfromwalletComponent;
  let fixture: ComponentFixture<InvestfromwalletComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestfromwalletComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestfromwalletComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
