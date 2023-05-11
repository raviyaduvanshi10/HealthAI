import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs';
import { User } from '../models/user';
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.scss']
})
export class UsersComponent {

  users!: Observable<User[]>;
  searchText:any;
  isLoading = true;
  dataSource = null;
  constructor(private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    this.reloadData();
  }
  async reloadData() {
    await new Promise(resolve => setTimeout(resolve, 1000));
    this.usersService.getUserList().subscribe(data => {
      this.dataSource = data;
      this.isLoading = false;
    },
      err => console.log(err));
  }


  deleteUser(id: string) {
    console.log(id);
    this.usersService.updateUser({"deleteId":id}).subscribe(data => {
      console.log(data);
      this.reloadData();
    },
      error => console.log(error));
  }

}
