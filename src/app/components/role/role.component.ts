import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { RolepermissionService } from 'src/app/service/rolepermission.service';

declare var $: any;
@Component({
  selector: 'app-role',
  templateUrl: './role.component.html',
  styleUrls: ['./role.component.css'],
})
export class RoleComponent implements OnInit {
  error = '';
  public roleList: any = [];
  roleForm!: FormGroup;
  roleEditForm!: FormGroup;

  constructor(
    private role: RolepermissionService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getRole();
    this.roleForm = this.fb.group({
      name: ['', Validators.required],
    });

    this.roleEditForm = this.fb.group({
      name: ['', Validators.required],
      roleId: ['', Validators.required],
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
  getRole(): void {
    this.role.getRoles().subscribe((response) => {
      this.roleList = response;
      this.dataTable();
    });
  }

  addRole(): void {
    this.role.addRole(this.roleForm.value).subscribe((res: any) => {
      this.toastr.info(res.message, 'Great Job');
      this.getRole();
      $('#modal-default').modal('hide');
    });
  }

  showModel() {
    $('#modal-default').modal('show');
  }

  // edit role
  editRole(role: any) {
    $('#edtrole').modal('show');
    this.roleEditForm.get('name')?.setValue(role.rolename);
    this.roleEditForm.get('roleId')?.setValue(role.roleid);
  }

  updateRole() {
    this.role.editRole(this.roleEditForm.value).subscribe((response : any) => {
      this.toastr.info(response.message, 'Great Job');
      $('#edtrole').modal('hide');
      this.getRole();
    });
  }

  deleteRole(id: any) {
    this.role.deleteRole(id).subscribe((res) => {
      console.log(res);
      this.getRole();
    });
  }
}
