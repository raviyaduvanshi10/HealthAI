import { DatePipe } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { FormBuilder, FormGroup, NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer } from '@angular/platform-browser';
import { UsersService } from 'src/app/services/users.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {
  user_image: any
  schedule_doc: any
  image!: Observable<any>
  jsonData!: any;
  actions = ["In processing", "Completed"]
  dataSource: any = [];
  isLoading = false;
  name: any;
  today: Date = new Date();
  pipe = new DatePipe('en-US');
  todayWithPipe: any = null;
  docForm!: FormGroup;

  constructor(private http: HttpClient, private sanitizer: DomSanitizer, private userService: UsersService, private fb: FormBuilder) { }

  ngOnInit(): void {
    this.user_image = `assets/images/inventoLogo.jpg`;
    var myDate = new Date();
    console.log(myDate);
    var user = JSON.parse(localStorage.getItem("approvedCredential") || '{}');
    console.log(user);
    this.dataSource.push(user);
    this.reloadData();
    this.name = user.userName;
    this.todayWithPipe = this.pipe.transform(Date.now(), 'fullDate');
    this.docForm = this.fb.group({
      docFile: ""
    });
  }

  async reloadData() {
    this.isLoading = true;
    await new Promise(resolve => setTimeout(resolve, 2000));
    this.userService.getSavedPrediction().subscribe(data => {
      this.jsonData = data;
      console.log(this.jsonData)
      this.isLoading = false;
    },
      err => console.log(err));
  }

  submitted = false;
  autoGrowTextZone(e: any) {
    e.target.style.height = "0px";
    e.target.style.height = (e.target.scrollHeight + 25) + "px";
  }

  cancel() {
    var taskFormId = document.getElementById("taskform");
    taskFormId!.style.display = "none";
    var taskTableId = document.getElementById("taskTable");
    taskTableId!.style.display = "block";
  }


  back() {
    var docID = document.getElementById("pdffile");
    docID!.style.display = "none";
    var showTableID = document.getElementById("showTable");
    showTableID!.style.display = "block";
  }

  deleteUser(id: any) {
    this.userService.deletePrediction(id).subscribe(data=>{
      console.log(data);
      this.reloadData()
    },
    err => console.log(err))
  }

}
