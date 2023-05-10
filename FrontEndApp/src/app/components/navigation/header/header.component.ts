import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
// import { BnNgIdleService } from 'bn-ng-idle'; // import it to your component
import { UsersService } from 'src/app/services/users.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent {
  @Output() public sidenavToggle = new EventEmitter();
  managerId:any;
  leadId:any;
  recruiterId:any;
  employeeId:any;
  employeeName:any;
  constructor(public dialog: MatDialog, private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    try {
      console.log("Try is running.")
      var auth = JSON.parse(localStorage.getItem("approvedCredential") || '{}');
      console.log("Check Log")
      console.log(auth.accessType);
      if (auth.accessType == "user") {
        this.recruiterId = document.getElementById("admin");
        this.recruiterId.style.display = "none";
        console.log("User");
      }
    }
    catch (Error) {
      console.log("Catch is running");
      this.usersService.logOut();
    }
  }

  stay() {
    var sessionId = document.getElementById("session");
    // sessionId.style.display = "none";
    // this.startWatching();
  }

  out() {
    this.usersService.logOut();
  }

  logOut() {
    this.usersService.logOut();
  }

  public onToggleSidenav = () => {
    this.sidenavToggle.emit();
  }

}
