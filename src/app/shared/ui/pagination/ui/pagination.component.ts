import { Component } from '@angular/core';
import { CreditPaginationService } from 'src/app/shared/services';

@Component({
  selector: 'app-pagination',
  templateUrl: './pagination.component.html',
  styleUrls: ['./pagination.component.scss'],
})
export class PaginationComponent {
  constructor(protected creditPaginationService: CreditPaginationService) {}
}
