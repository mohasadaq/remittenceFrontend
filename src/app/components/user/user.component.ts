import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from 'src/app/service/user.service';
declare var $: any;
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
})
export class UserComponent implements OnInit {
  error = '';
  userList: any = [];
  userForm!: FormGroup;

  constructor(
    private user: UserService,
    private fb: FormBuilder,
    private toastr: ToastrService
  ) {}

  ngOnInit(): void {
    this.getUsers();
    this.userForm = this.fb.group({
      fullName: ['', Validators.required],
      email: [null, [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  dataTable() {
    $(function () {
      $('#example1')
        .DataTable({
          responseponsive: true,
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
        responseponsive: true,
      });
    });
  }

  getUsers() {
    this.user.getUsers().subscribe((responseponse) => {
      this.userList = responseponse;
      this.dataTable();
    });
  }

  addUser(): void {
    this.user.addUser(this.userForm.value).subscribe((response: any) => {
      this.toastr.info(response.message, 'Great Job');
      this.getUsers();
      $('#modal-default').modal('hide');
    });
  }

  showModel() {
    $('#modal-default').modal('show');
  }

  // edit user
  editUser(user: any) {
    $('#modal-default').modal('show');
    this.userForm.get('fullName')?.setValue(user.fullname);
  }

  deleteUser(id: any) {
    this.user.deleteUser(id).subscribe((response) => {
      this.getUsers();
    });
  }
}
