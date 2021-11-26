import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PermissionGuard } from './common/permission.guard';
import { AppLayoutComponent } from './components/app-layout/app-layout.component';
import { AprovemoneyComponent } from './components/aprovemoney/aprovemoney.component';
import { CityComponent } from './components/city/city.component';
import { CountryComponent } from './components/country/country.component';
import { CurrencyComponent } from './components/currency/currency.component';
import { CustomerLayoutComponent } from './components/customer-layout/customer-layout.component';
import { CustomerComponent } from './components/customer/customer.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { HomeComponent } from './components/home/home.component';
import { LoginComponent } from './components/login/login.component';
import { RoleComponent } from './components/role/role.component';
import { SendmoneyComponent } from './components/sendmoney/sendmoney.component';
import { SignupComponent } from './components/signup/signup.component';
import { StateComponent } from './components/state/state.component';
import { UserComponent } from './components/user/user.component';

const routes: Routes = [
  {path:'', component:CustomerLayoutComponent,
  children :[
    {path: '', component:HomeComponent},
    {path:'signup', component:SignupComponent},
    {path:'login', component:LoginComponent},
    {path:'admin/login', component:LoginComponent}
  ]
},
{path:'', component:AppLayoutComponent,
children :[
     {path:'dashboard', component:DashboardComponent},
     {path:'user', component:UserComponent ,
      canActivate: [PermissionGuard],
      data: {permission: 'viewAllUsers'}
    },
     {path:'customer', component:CustomerComponent, canActivate: [PermissionGuard],
      data:{permission: 'viewCustomer'}
    },
     {path:'country', component:CountryComponent},
     {path:'state', component:StateComponent},
     {path:'city', component:CityComponent},
     {path:'city/:id', component:CityComponent},
     {path:'currency', component:CurrencyComponent},
     {path:'role', component:RoleComponent},
     {path:'sendMoney', component:SendmoneyComponent},
     {path:'aprove', component:AprovemoneyComponent},
   ]
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
