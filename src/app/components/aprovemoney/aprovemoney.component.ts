import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { LocalStorage } from 'src/app/common/local.storage';
import { OperationsService } from 'src/app/service/operations.service';
import { RemittenceService } from 'src/app/service/remittence.service';

declare var $ : any
@Component({
  selector: 'app-aprovemoney',
  templateUrl: './aprovemoney.component.html',
  styleUrls: ['./aprovemoney.component.css']
})
export class AprovemoneyComponent implements OnInit {
  remittenceList: any;
  remittenceForm !: FormGroup 
  constructor(
    private remittence: RemittenceService,
    private fb: FormBuilder,
    private toastr: ToastrService,
    private localStorage: LocalStorage,
    private operation: OperationsService,
  ) {}

  ngOnInit(): void {
    this.getRemittence();
    this.operation.getStatus().subscribe((response:any)=>{
      response.data.map((status :any)=>{
        $('#status').append(`
         <option value='${status.statusid}'>${status.statusname}</option>
        `)
      })
    })

    this.remittenceForm = this.fb.group({
      status : ['',Validators.required],
      remittenceId : ['',Validators.required],
      userid : [this.localStorage.getData().userId,Validators.required],
    })
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


  public getRemittence(): void {
    this.remittence.getRemittence().subscribe((response: any) => {
      this.remittenceList = response;
      this.dataTable();
    });
  }

  showModel(remittenceId :any){
    $('#aproveremittencemodel').modal('show')
    this.remittenceForm.get('remittenceId')?.setValue(remittenceId)
  }

  updateStatus(){
    this.remittence.aproveRemittence(this.remittenceForm.value).subscribe((res:any)=>{
    this.toastr.success(res.messsage,'Greate Job !')
    this.getRemittence();
    $('#aproveremittencemodel').modal('hide')
    })
  }

}
