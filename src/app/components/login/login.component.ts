import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from 'src/app/service/auth.service';
import { CustomerService } from 'src/app/service/customer.service';
// declare var jwt_decode : any
import jwt_decode from 'jwt-decode';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(
    private login: CustomerService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private auth: AuthService,
    private route: Router
  ) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: [null, [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  checkLogin() {
    if (location.pathname.includes('admin')) {
      this.auth.userAuth(this.loginForm.value).subscribe((response: any) => {
        localStorage.setItem('token', response.message.token);
        let userData: any = jwt_decode(response.message.token);
        this.auth.getRolePermission(userData);
        if (this.hasPermission()) {
          this.toastr.success('successfuly', 'Great');
          this.route.navigateByUrl('/user');
        } else {
          this.toastr.error('You can not Access Contact System Admin !');
        }
      });
    } else {
      this.auth
        .customerAuth(this.loginForm.value)
        .subscribe((response: any) => {
          localStorage.setItem('token', response.message.token);
          let userData: any = jwt_decode(response.message.token);
          this.auth.getRolePermission(userData);
          if (this.hasPermission()) {
            this.route.navigateByUrl('/sendmoney');
            this.toastr.success('successfuly', 'Great');
          } else {
            this.toastr.error('You can not Access Contact System Admin !');
          }
        });
    }
  }

  private hasPermission() {
    let permissions = JSON.parse(
      localStorage.getItem('rolesPermission') || '[]'
    ).length;
    if (permissions) {
      return true;
    } else {
      return false;
    }
  }
}
