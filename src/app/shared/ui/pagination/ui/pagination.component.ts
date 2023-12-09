import { Component, OnInit } from '@angular/core';
import { CreditFiltersService } from 'src/app/modules/credit/services';
import { CreditPaginationService } from 'src/app/shared/services';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent implements OnInit {
  constructor(
    protected creditPaginationService: CreditPaginationService,
    protected creditFiltersService: CreditFiltersService
  ) {}

  ngOnInit() {}
}
