import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { CustomerService } from 'src/app/service/customer.service';
declare var $ : any
@Component({
  selector: 'app-customer',
  templateUrl: './customer.component.html',
  styleUrls: ['./customer.component.css']
})
export class CustomerComponent implements OnInit {

  error = '';
  customerList : any = []
  customerForm!: FormGroup;
  customerEditForm!: FormGroup;

  constructor(private customer : CustomerService, private fb : FormBuilder,
    private toastr: ToastrService) { }

  ngOnInit(): void {
    this.getCustomers()
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      userid: [1],
      email: [null, [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

    this.customerEditForm = this.fb.group({
      name: ['', Validators.required],
      address: ['', Validators.required],
      contact: ['', Validators.required],
      customerId : ['', Validators.required],
    });
    
  }

  
  dataTable(){
    $(function () {
      $("#example1").DataTable({
        "responsive": true, "lengthChange": true, "autoWidth": false,
        "buttons": ["copy", "csv", "excel", "pdf", "print", "colvis"]
      }).buttons().container().appendTo('#example1_wrapper .col-md-6:eq(0)');
      $('#example2').DataTable({
        "paging": true,
        "lengthChange": false,
        "searching": false,
        "ordering": true,
        "info": true,
        "autoWidth": false,
        "responsive": true,
      });
    });
  }
  
  getCustomers(): void{
    this.customer.getCustomers().subscribe(response=>{
      this.customerList = response
      this.dataTable()
    })
  }


  addCustomer(): void {
    this.customer.addCustomer(this.customerForm.value).subscribe((res:any) => {
      this.toastr.info(res.message, 'Great Job')
      this.getCustomers();
      $('#modal-default').modal('hide');
    });
  }

  showModel() {
    $('#modal-default').modal('show');
  }


  // edit Customer
  editCustomer(customer: any) {
    $('#edtCustomer').modal('show');
    this.customerEditForm.get('name')?.setValue(customer.name);
    this.customerEditForm.get('contact')?.setValue(customer.contact);
    this.customerEditForm.get('address')?.setValue(customer.address);
    this.customerEditForm.get('customerId')?.setValue(customer.customerid);
  }


  updateCustomer(){
    console.log(this.customerEditForm.value);
    
    this.customer.editCustomer(this.customerEditForm.value).subscribe(response=>{
      console.log(response);
    $('#edtCustomer').modal('hide');

      this.getCustomers();
    })
  }

  deleteCustomer(id: any) {
    this.customer.deleteCustomer(id).subscribe((res) => {
      console.log(res);
      this.getCustomers();
    });
  }

}


