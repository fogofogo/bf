import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { DepositRestrictionsComponent } from './deposit-restrictions.component';

describe('DepositRestrictionsComponent', () => {
  let component: DepositRestrictionsComponent;
  let fixture: ComponentFixture<DepositRestrictionsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ DepositRestrictionsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(DepositRestrictionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
