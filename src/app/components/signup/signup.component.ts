import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { CustomerService } from 'src/app/service/customer.service';
import { ToastrService } from 'ngx-toastr';
declare var $ : any

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  customerList : any = []
  customerForm!: FormGroup;

  constructor(private customer : CustomerService, private fb : FormBuilder,private toastr: ToastrService) { }

  ngOnInit(): void {
    // this.getCustomers()

    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      userid: [1],
      email: [null, [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  
  }


  addCustomer(): void {
    this.customer.addCustomer(this.customerForm.value).subscribe((res:any) => {
      this.customerForm.reset()
      this.toastr.success(res.message, 'Great Job !');
      console.log(res.status);
    });
  }
}
