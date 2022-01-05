import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { SubSink } from 'subsink';
import { UserService } from '../user.service';

@Component({
  selector: 'app-user-table',
  templateUrl: './user-table.component.html',
  styleUrls: ['./user-table.component.scss']
})
export class UserTableComponent implements OnInit {

  private subs = new SubSink();
  users: any;
  form: FormGroup
  isTrue: boolean

  constructor(
    private userService: UserService,
    private fb: FormBuilder
  ) {
    this.form = this.fb.group({
      search: [null]
    })
  }

  ngOnInit(): void {
  }

  getUsers(value: any) {
    this.subs.sink = this.userService.getUsers(value).subscribe(resp => {
      console.log(resp);
      this.formatTitlesData(resp);
    })
  }

  formatTitlesData(data: any) {
    this.users = data.data.GetAllUsers;
    console.log(this.users);
  }

  ngOnDestroy() {
    this.subs.unsubscribe();
  }

  search(value: any): void {
    if (value.value.length > 3) {
      this.getUsers(value.value);
      this.isTrue = true
    } else {
      this.isTrue = false
    }
  }

}
