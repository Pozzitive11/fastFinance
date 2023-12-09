import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CreditsDashboardComponent } from './credits-dashboard.component';

describe('CreditsDashboardComponent', () => {
  let component: CreditsDashboardComponent;
  let fixture: ComponentFixture<CreditsDashboardComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditsDashboardComponent],
    });
    fixture = TestBed.createComponent(CreditsDashboardComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
