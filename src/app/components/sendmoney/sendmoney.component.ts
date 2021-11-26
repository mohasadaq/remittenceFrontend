import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from 'src/app/common/local.storage';
import { CustomerService } from 'src/app/service/customer.service';
import { OperationsService } from 'src/app/service/operations.service';
import { RemittenceService } from 'src/app/service/remittence.service';

declare var $: any;
@Component({
  selector: 'app-sendmoney',
  templateUrl: './sendmoney.component.html',
  styleUrls: ['./sendmoney.component.css'],
})
export class SendmoneyComponent implements OnInit {
  public remittenceList: any = [];
  remittenceForm!: FormGroup;
  remittenceEditForm!: FormGroup;
  countryList: any;
  currencyList: any;
  convertion: string='';
  charge : string = ''
  total : string = ''

  constructor(
    private remittence: RemittenceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private localStorage: LocalStorage,
    private operation: OperationsService,
    private customer: CustomerService
  ) {}

  ngOnInit(): void {
    this.getRemittence();
    this.getCustomers();
    this.getCurrency()
    this.operation.getCountry().subscribe((res) => {
      this.countryList = res;
    });
    // payment type
    this.operation.getPayment().subscribe((res) => {
      this.displayPayment(res);
    });

    this.remittenceForm = this.fb.group({
      senderid: ['', Validators.required],
      userid: [0, Validators.required],
      receiverid: ['', Validators.required],
      paymantid: ['', Validators.required],
      sendingfrom: ['', Validators.required],
      sendingcurrencyid: ['', Validators.required],
      recievingcurrencyid: ['', Validators.required],
      sendingto: ['', Validators.required],
      sendingamount: ['', Validators.required],
      receivingamount: ['', Validators.required],
      charge: ['', Validators.required],
    });
  }

  getCurrency(): void {
    this.operation.getCurrency().subscribe((response: any) => {
    this.getSelectedCountryCurrency(response.data)
    });
  }

  getCustomers(): void {
    this.customer.getCustomers().subscribe((response: any) => {
      let isaCustomer = this.localStorage.getData().customerId;
      if (isaCustomer) {
        let customerList = response.data.filter(
          (customer: any) => customer.userid == isaCustomer
        );
        this.displayCustomer(customerList);
      }
    });
  }

  dataTable() {
    $(function () {
      $('#example1')
        .DataTable({
          responsive: true,
          lengthChange: true,
          autoWidth: false,
          buttons: ['copy', 'csv', 'excel', 'pdf', 'print', 'colvis'],
        })
        .buttons()
        .container()
        .appendTo('#example1_wrapper .col-md-6:eq(0)');
      $('#example2').DataTable({
        paging: true,
        lengthChange: false,
        searching: false,
        ordering: true,
        info: true,
        autoWidth: false,
        responsive: true,
      });
    });
  }

  displayCountry() {
    this.countryList.data.map((country: any) => {
      $('#sendingfrom,#sendingto').append(`
        <option value='${country.countryid}'>${country.countryname}</option>
      `);
    });
  }

  // dispay payment type
  displayPayment(result: any) {
    result.data.map((payment: any) => {
      $('#paymantid').append(`
        <option value='${payment.paymantid}'>${payment.paymanttype}</option>
      `);
    });
  }

  displayCustomer(customers: any) {
    customers.map((customer: any) => {
      $('#receiverid').append(`
        <option value='${customer.customerid}'>${customer.name}</option>
      `);
    });
  }

  public getRemittence(): void {
    this.remittence.getRemittence().subscribe((response: any) => {
      this.remittenceList = response;
      this.dataTable();
    });
  }

  addRemittence(): void {
    this.remittence
      .registorRemittence(this.remittenceForm.value)
      .subscribe((res: any) => {
        console.log(res);
        this.toastr.info(res.message, 'Great Job');
        this.getRemittence();
        $('#modal-default').modal('hide');
      });
  }

  showModel() {
    $('#modal-default').modal('show');
    this.displayCountry();
  }

  deleteRemittence(id: any) {
    this.remittence.deleteRemittence(id).subscribe((res: any) => {
      this.getRemittence();
    });
  }

  getSelectedCountryCurrency(currency : any){
    let sendingCurrency :any
    let recivingCurrencyId :any
    $('#sendingfrom').on('change',()=>{
      let countryId = $('#sendingfrom').val()
      sendingCurrency  = currency.filter((curr : any) => curr.countryid==countryId)[0]
      recivingCurrencyId = currency.filter((curr : any) => curr.currancycode.toLowerCase() =='usd')[0].currancyid
      console.log(recivingCurrencyId);
      
      this.convertion = `1 USD = ${sendingCurrency.rate} ${sendingCurrency.currancyname}`
    
  })

  $('#sendingamount').on('input',()=>{
      console.log(`1 USD = ${$('#sendingamount').val()/sendingCurrency.rate}`);
      let amount = (Number($('#sendingamount').val())/ Number(sendingCurrency.rate)) 
      $('#recievingamount').val(amount)
      this.remittenceForm.get('senderid')?.setValue(this.localStorage.getData().customerId)
      this.remittenceForm.get('sendingcurrencyid')?.setValue(sendingCurrency.currancyid)
      this.remittenceForm.get('recievingcurrencyid')?.setValue(recivingCurrencyId)
      this.remittenceForm.get('receivingamount')?.setValue(amount)
      this.remittenceForm.get('charge')?.setValue(0.02)
      this.charge = `Charge ${0.02 * $('#sendingamount').val()}`
      this.total = `Total ${((0.02 * $('#sendingamount').val()) + Number($('#sendingamount').val())) +' '+ sendingCurrency.currancyname}`
      // recievingcurrencyid
      console.log(this.remittenceForm.value)
    })
  }
}
