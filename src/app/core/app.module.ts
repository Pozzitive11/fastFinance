import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { AppComponent } from './ui';
import { DecimalPipe, JsonPipe } from '@angular/common';
import { AppRoutingModule } from '@pages/app-routing.module';
import { CreditDashboardPage } from '@pages/credit-dashboard-page';
import { PagesModule } from '@pages/pages.module';
import { StatisticsPageComponent } from '@pages/statistics-page';
import { HeaderComponent } from '@components/header';
import { CreditsModule } from '@modules/credit/credit.module';

@NgModule({
  declarations: [
    AppComponent,
    StatisticsPageComponent,
    HeaderComponent,
    CreditDashboardPage,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    CreditsModule,
    PagesModule,
  ],
  providers: [DecimalPipe, JsonPipe],
  bootstrap: [AppComponent],
})
export class AppModule {}
