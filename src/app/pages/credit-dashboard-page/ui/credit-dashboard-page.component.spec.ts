import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditDashboardPage } from './credit-dashboard-page.component';

describe('CreditDashboardPage', () => {
  let component: CreditDashboardPage;
  let fixture: ComponentFixture<CreditDashboardPage>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditDashboardPage],
    });
    fixture = TestBed.createComponent(CreditDashboardPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
