import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OperationsService } from 'src/app/service/operations.service';

declare var $ : any 
@Component({
  selector: 'app-currency',
  templateUrl: './currency.component.html',
  styleUrls: ['./currency.component.css']
})
export class CurrencyComponent implements OnInit {

  error = '';
  currencyList: any = [];
  countryList: any = [];
  stateList: any = [];
  currencyForm!: FormGroup;
  currencyEditForm!: FormGroup;

  constructor(private currency: OperationsService, private fb: FormBuilder,
    private toastr : ToastrService) {}

  ngOnInit(): void {
    this.currency.getCountry().subscribe((res) => {
      this.countryList = res;      
    });

    this.getCurrency();
    this.currencyForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      countryId: ['', Validators.required],
    });

    this.currencyEditForm = this.fb.group({
      name: ['', Validators.required],
      code: ['', Validators.required],
      currencyId: ['', Validators.required],
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
  
  getCurrency(): void {
    this.currency.getCurrency().subscribe((response) => {
      this.currencyList = response;
      this.dataTable()
    });
  }

  addCurrency(): void {
    console.log(this.currencyForm.value);
    this.currency.addCurrency(this.currencyForm.value).subscribe((res:any) => {
      this.toastr.info(res.message, 'Great Job')
      this.getCurrency();
      $('#modal-default').modal('hide');
    });
  }

  showModel() {
    $('#modal-default').modal('show');
      this.displayCountry()
  }

  // edit currency
  editCurrency(currency: any) {
    $('#edtcurrency').modal('show');
    this.currencyEditForm.get('name')?.setValue(currency.currancyname);
    this.currencyEditForm.get('code')?.setValue(currency.currancycode);
    this.currencyEditForm.get('currencyId')?.setValue(currency.currancyid);
  }

  updateCurrency() {
    this.currency.editCurrency(this.currencyEditForm.value).subscribe((response:any) => {
      this.toastr.info(response.message, 'Great Job')
      $('#edtcurrency').modal('hide');
      this.getCurrency();
    });
  }

displayCountry(){
  this.countryList.data.map((country:any) => {
    $('#country').append(`
      <option value='${ country.countryid }'>${ country.countryname }</option>
    `)
  });
}
  deleteCurrency(id: any) {
    this.currency.deleteCurrency(id).subscribe((res) => {
      console.log(res);
      this.getCurrency();
    });
  }

}
