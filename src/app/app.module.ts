import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './components/header/header.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { UserComponent } from './components/user/user.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { CommonInterceptor } from './common/common.interceptor';
import { ReactiveFormsModule } from '@angular/forms';
import { CustomerComponent } from './components/customer/customer.component';
import { CountryComponent } from './components/country/country.component';
import { StateComponent } from './components/state/state.component';
import { CityComponent } from './components/city/city.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { RoleComponent } from './components/role/role.component';
import { HomeComponent } from './components/home/home.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { SignupComponent } from './components/signup/signup.component';
import { LoginComponent } from './components/login/login.component';
import { CustomerLayoutComponent } from './components/customer-layout/customer-layout.component';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { NgxPermissionsModule } from 'ngx-permissions';
import { SendmoneyComponent } from './components/sendmoney/sendmoney.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    SidebarComponent,
    DashboardComponent,
    UserComponent,
    CustomerComponent,
    CountryComponent,
    StateComponent,
    CityComponent,
    CurrencyComponent,
    RoleComponent,
    HomeComponent,
    NavbarComponent,
    SignupComponent,
    LoginComponent,
    CustomerLayoutComponent,
    AppLayoutComponent,
    SendmoneyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule, // required animations module
    ToastrModule.forRoot(), // ToastrModule added
    AppRoutingModule,
    HttpClientModule,
    ReactiveFormsModule,
    NgxPermissionsModule.forRoot()
  ],
  providers: [
    {provide: HTTP_INTERCEPTORS, useClass: CommonInterceptor,multi:true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
