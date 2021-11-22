import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { OperationsService } from 'src/app/service/operations.service';

declare var $ : any
@Component({
  selector: 'app-country',
  templateUrl: './country.component.html',
  styleUrls: ['./country.component.css']
})
export class CountryComponent implements OnInit {

  error = '';
 public countryList : any = []
  countryForm!: FormGroup;
  countryEditForm!: FormGroup;

  constructor(private country : OperationsService, private fb : FormBuilder,private toastr : ToastrService) { }

  ngOnInit(): void {
    this.getCountry()
    this.countryForm = this.fb.group({
      name: ['', Validators.required]
    });

    this.countryEditForm = this.fb.group({
      name: ['', Validators.required],
      countryId: ['', Validators.required],
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
  
 public getCountry(): void{
    this.country.getCountry().subscribe(response=>{
      this.countryList = response
      this.dataTable()
    })
  }


  addCountry(): void {
    this.country.addCountry(this.countryForm.value).subscribe((res:any) => {
      console.log(res);
      this.toastr.info(res.message, 'Great Job')
      
      this.getCountry();
      $('#modal-default').modal('hide');
    });
  }

  showModel() {
    $('#modal-default').modal('show');
  }


  // edit Country
  editCountry(country: any) {
    $('#edtCountry').modal('show');
    this.countryEditForm.get('name')?.setValue(country.countryname);
    this.countryEditForm.get('countryId')?.setValue(country.countryid);
  }


  updateCountry(){   
    this.country.editCountry(this.countryEditForm.value).subscribe((response :any)=>{
      // console.log(response);
      this.toastr.info(response.message, 'Great Job')

    $('#edtCountry').modal('hide');
      this.getCountry();
    })
  }

  deleteCountry(id: any) {
    this.country.deleteCountry(id).subscribe((res) => {
      console.log(res);
      this.getCountry();
    });
  }

}
