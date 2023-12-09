import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreditFiltersComponent } from './credit-filters.component';

describe('CreditFiltersComponent', () => {
  let component: CreditFiltersComponent;
  let fixture: ComponentFixture<CreditFiltersComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CreditFiltersComponent],
    });
    fixture = TestBed.createComponent(CreditFiltersComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
