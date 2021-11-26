import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RolepermissionService } from 'src/app/service/rolepermission.service';
declare var $ : any
@Component({
  selector: 'app-permissions',
  templateUrl: './permissions.component.html',
  styleUrls: ['./permissions.component.css']
})
export class PermissionsComponent implements OnInit {

  public permissionList: any = [];
  permissionForm!: FormGroup;
  permissionEditForm!: FormGroup;

  constructor(
    private permission: RolepermissionService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getPermission();
    this.permissionForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.permissionEditForm = this.fb.group({
      name: ['', Validators.required],
      permissionId: ['', Validators.required],
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
  getPermission(): void {
    this.permission.getPermissions().subscribe((response : any) => {
      this.permissionList = response;
      this.dataTable();
    });
  }

  addPermission(): void {
    this.permission.addPermission(this.permissionForm.value).subscribe((res: any) => {
      this.toastr.info(res.message, 'Great Job');
      this.getPermission();
      $('#modal-default').modal('hide');
    });
  }

  showModel() {
    $('#modal-default').modal('show');
  }

  // edit permission
  editPermission(permission: any) {
    $('#edtpermission').modal('show');
    this.permissionEditForm.get('name')?.setValue(permission.permissionname);
    this.permissionEditForm.get('permissionId')?.setValue(permission.permissionid);
  }

  updatePermission() {
    this.permission.editPermission(this.permissionEditForm.value).subscribe((response : any) => {
      this.toastr.info(response.message, 'Great Job');
      $('#edtpermission').modal('hide');
      this.getPermission();
    });
  }

  deletePermission(id: any) {
    this.permission.deletePermission(id).subscribe((res:any) => {
      this.toastr.success(res.message,'Great Job !')
      console.log(res);
      this.getPermission();
    });
  }


}
