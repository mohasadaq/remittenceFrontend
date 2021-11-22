import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OperationsService } from 'src/app/service/operations.service';
import { CountryComponent } from '../country/country.component';
declare var $: any;
@Component({
  selector: 'app-state',
  templateUrl: './state.component.html',
  styleUrls: ['./state.component.css'],
})
export class StateComponent implements OnInit {
  error = '';
  stateList: any = [];
  countryList: any = [];
  stateForm!: FormGroup;
  stateEditForm!: FormGroup;

  constructor(
    private state: OperationsService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.state.getCountry().subscribe((res) => {
      this.countryList = res;
      console.log(this.countryList);
    });

    this.getState();
    this.stateForm = this.fb.group({
      name: ['', Validators.required],
      countryid: ['', Validators.required],
    });

    this.stateEditForm = this.fb.group({
      name: ['', Validators.required],
      stateId: ['', Validators.required],
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

  getState(): void {
    this.state.getState().subscribe((response) => {
      this.stateList = response;
      this.dataTable();
    });
  }

  addState(): void {
    this.state.addState(this.stateForm.value).subscribe((res: any) => {
      this.toastr.info(res.message, 'Great Job');
      this.getState();
      $('#modal-default').modal('hide');
    });
  }

  showModel() {
    $('#modal-default').modal('show');
  }

  // edit state
  editState(state: any) {
    $('#edtstate').modal('show');
    this.stateEditForm.get('name')?.setValue(state.statename);
    this.stateEditForm.get('stateId')?.setValue(state.stateid);
  }

  updateState() {
    this.state.editState(this.stateEditForm.value).subscribe((response:any) => {
      this.toastr.info(response.message, 'Great Job');
      $('#edtstate').modal('hide');
      this.getState();
    });
  }

  deleteState(id: any) {
    this.state.deleteState(id).subscribe((res) => {
      console.log(res);
      this.getState();
    });
  }
}
