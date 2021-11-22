import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OperationsService } from 'src/app/service/operations.service';

declare var $: any;
@Component({
  selector: 'app-city',
  templateUrl: './city.component.html',
  styleUrls: ['./city.component.css'],
})
export class CityComponent implements OnInit {

  error = '';
  cityList: any = [];
  countryList: any = [];
  stateList: any = [];
  cityForm!: FormGroup;
  cityEditForm!: FormGroup;

  constructor(private city: OperationsService, private fb: FormBuilder,private toastr: ToastrService) {}

  ngOnInit(): void {
    this.city.getCountry().subscribe((res) => {
      this.countryList = res;
    });

    this.city.getState().subscribe((res) => {
      this.stateList = res;
    });

    this.getCity();
    this.cityForm = this.fb.group({
      name: ['', Validators.required],
      countryId: ['', Validators.required],
      stateId: ['', Validators.required],
    });

    this.cityEditForm = this.fb.group({
      name: ['', Validators.required],
      cityId: ['', Validators.required],
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

  getCity(): void {
    this.city.getCity().subscribe((response) => {
      this.cityList = response;
      this.dataTable()
    });
  }

  addCity(): void {
    console.log(this.cityForm.value);
    this.city.addCity(this.cityForm.value).subscribe((res :any) => {
      this.toastr.success(res.message, 'Great Job')
      this.getCity();
      $('#modal-default').modal('hide');
    });
  }

  showModel() {
    $('#modal-default').modal('show');
  }

  // edit city
  editCity(city: any) {
    alert(city)
    $('#edtcity').modal('show');
    this.cityEditForm.get('name')?.setValue(city.cityname);
    this.cityEditForm.get('cityId')?.setValue(city.cityid);
  }

  updateCity() {
    console.log(this.cityEditForm.value);

    this.city.editCity(this.cityEditForm.value).subscribe((response : any) => {
      console.log(response);
      this.toastr.info(response.message, 'Great Job')
      $('#edtcity').modal('hide');
      this.getCity();
    });
  }

  deleteCity(id: any) {
    this.city.deleteCity(id).subscribe((res) => {
      console.log(res);
      this.getCity();
    });
  }
}
