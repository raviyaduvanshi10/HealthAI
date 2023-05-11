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
  userId:any;
  adminId:any;
  predictedId:any;
  constructor(public dialog: MatDialog, private router: Router, private usersService: UsersService) { }

  ngOnInit(): void {
    try {
      console.log("Try is running.")
      var auth = JSON.parse(localStorage.getItem("approvedCredential") || '{}');
      console.log("Check Log")
      console.log(auth.accessType);
      if (auth.accessType == "user") {
        this.userId = document.getElementById("userId");
        this.userId.style.display = "none";
        console.log("User");
      }
      if (auth.accessType == "admin") {
        this.adminId = document.getElementById("adminId");
        this.adminId.style.display = "none";
        this.predictedId = document.getElementById("predictedId");
        this.predictedId.style.display = "none";
        console.log("Admin");
        this.router.navigate(["/default/users"]);
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
