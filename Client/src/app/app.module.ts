import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  CommonModule, LocationStrategy,
  PathLocationStrategy
} from '@angular/common';
import { ToastrModule } from 'ngx-toastr';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { Routes, RouterModule } from '@angular/router';

import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import { FullComponent } from './layouts/full/full.component';


import { NavigationComponent } from './shared/header/navigation.component';
import { SidebarComponent } from './shared/sidebar/sidebar.component';
import Swal from 'sweetalert2';
import { Approutes } from './app-routing.module';
import { AppComponent } from './app.component';
import { SpinnerComponent } from './shared/spinner.component';
import { DefaultLayoutComponent } from './default-layout/default-layout.component';
import { LoginLayoutComponent } from './login-layout/login-layout.component';
import { AlphabetOnlyDirective } from './alphabet-only.directive';
import { HighchartsChartModule } from 'highcharts-angular';
import { ChartModule } from 'angular-highcharts';
import { Ng2SearchPipeModule } from 'ng2-search-filter';








@NgModule({
  declarations: [
    AppComponent,
    SpinnerComponent,
    DefaultLayoutComponent,
    LoginLayoutComponent,
    AlphabetOnlyDirective,
    
    
  ],
  imports: [
    CommonModule,
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    NgbModule,
    RouterModule.forRoot(Approutes, { useHash: false }),
    FullComponent,
    SidebarComponent,
    HighchartsChartModule,
    ChartModule,
    NavigationComponent,
    ToastrModule.forRoot({positionClass: 'toast-top-right'}),
  ],
  providers: [
    {
      provide: LocationStrategy,
      useClass: PathLocationStrategy,
    },
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
