import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { InvestmentschemesComponent } from './investmentschemes.component';

describe('InvestmentschemesComponent', () => {
  let component: InvestmentschemesComponent;
  let fixture: ComponentFixture<InvestmentschemesComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ InvestmentschemesComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(InvestmentschemesComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
