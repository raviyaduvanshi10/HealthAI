import { DatePipe } from '@angular/common';
import { Component } from '@angular/core';
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
export class HomeComponent {
  // user_image:any
  // schedule_doc:any
  // image!: Observable<any>
  // taskJson!: Observable<any>;
  // actions = ["In processing", "Completed"]
  // dataSource:any = [];
  // isLoading = false;
  // employeeName:any;
  // today: Date = new Date();
  // pipe = new DatePipe('en-US');
  // todayWithPipe:any = null;
  // docForm!: FormGroup;

  // constructor(private http: HttpClient, private sanitizer: DomSanitizer, private userService: UsersService, private fb: FormBuilder,
  //   private router: Router, private _location: Location, private datePipe: DatePipe) { }

  // ngOnInit(): void {
  //   this.user_image = `assets/images/inventoLogo.jpg`;
  //   var myDate = new Date();
  //   console.log(myDate);
  //   var user = JSON.parse(localStorage.getItem("approvedCredential") || '{}');
  //   console.log(user);
  //   this.dataSource.push(user);
  //   this.reloadData();
  //   this.employeeName = user.userName;
  //   this.loadingFile();
  //   this.todayWithPipe = this.pipe.transform(Date.now(), 'fullDate');
  //   this.docForm = this.fb.group({
  //     docFile: ""
  //   });
  // }


  // onDocSelect(event:any) {
  //   if (event.target.files.length > 0) {
  //     const file = event.target.files[0];
  //     console.log(file.size);
  //     // this.docForm.get("docFile").setValue(file);
  //   }
  // }

  // async reloadData() {
  //   this.isLoading = true;
  //   await new Promise(resolve => setTimeout(resolve, 2000));
  //   // this.userService.getScheduleTask().subscribe(data => {
  //   //   this.taskJson = data;
  //   //   this.isLoading = false;
  //   // },
  //   //   err => console.log(err));
  // }

  // submitted = false;

  // tasks = {
  //   date: '',
  //   task: '',
  //   employeeId: '',
  //   employeeName: '',
  //   userName: ''
  // };

  // autoGrowTextZone(e:any) {
  //   e.target.style.height = "0px";
  //   e.target.style.height = (e.target.scrollHeight + 25) + "px";
  // }

  // loadingFile() {
  //   this.userService.getUserFile(this.employeeName).subscribe(data => {
  //     let ObjectUrl = URL.createObjectURL(data);
  //     this.user_image = this.sanitizer.bypassSecurityTrustUrl(ObjectUrl);
  //   },
  //     err => console.log(err));
  // }

  // onSubmit(scheduleForm: NgForm) {
  //   // this.submitted = true;

  //   this.tasks.employeeId = JSON.parse(localStorage.getItem("approvedCredential") || '{}')._employeeId;
  //   this.tasks.employeeName = JSON.parse(localStorage.getItem("approvedCredential") || '{}').employee;
  //   this.tasks.userName = JSON.parse(localStorage.getItem("approvedCredential") || '{}').userName;
  //   console.log(this.tasks.employeeId);
  //   this.save(scheduleForm);
  //   //this.openingForm.reset();
  // }

  // save(scheduleForm:any) {
  //   const formData = new FormData;
  //   formData.append("docFile", this.docForm.get("docFile").value);
  //   formData.append("scheduledForm", JSON.stringify(this.tasks));
  //   this.generalService.scheduleTask(formData).subscribe(data => {
  //     console.log(data);
  //     var taskFormId = document.getElementById("taskform");
  //     taskFormId.style.display = "none";
  //     var taskTableId = document.getElementById("taskTable");
  //     taskTableId.style.display = "block";
  //     this.reloadData();
  //     scheduleForm.resetForm();
  //   },
  //     err => console.log(err));
  // }

  // schedule() {
  //   var taskTableId = document.getElementById("taskTable");
  //   taskTableId.style.display = "none";
  //   var taskFormId = document.getElementById("taskform");
  //   taskFormId.style.display = "block";
  // }
  // cancel() {
  //   var taskFormId = document.getElementById("taskform");
  //   taskFormId.style.display = "none";
  //   var taskTableId = document.getElementById("taskTable");
  //   taskTableId.style.display = "block";
  // }

  // updateStatus(statusValue, _id) {
  //   var updatedValue = {
  //     "status": statusValue,
  //     "taskId": _id
  //   }

  //   this.generalService.updateTask(updatedValue).subscribe(data => {
  //     console.log(data);
  //     var taskFormId = document.getElementById("taskform");
  //     taskFormId.style.display = "none";
  //     var taskTableId = document.getElementById("taskTable");
  //     taskTableId.style.display = "block";
  //     this.reloadData();
  //   },
  //     err => console.log(err));
  // }

  // scheduleDocs(date) {
  //   this.employeeService.getDocs(this.employeeName + date).subscribe(data => {
  //     let ObjectUrl = URL.createObjectURL(data);
  //     this.schedule_doc = this.sanitizer.bypassSecurityTrustResourceUrl(ObjectUrl);
  //   },
  //     err => console.log(err));

  //   var showTableId = document.getElementById("showTable");
  //   showTableId.style.display = "none";
  //   var scheduleDocId = document.getElementById("pdffile");
  //   scheduleDocId.style.display = "block";
  // }

  // back() {
  //   var docID = document.getElementById("pdffile");
  //   docID.style.display = "none";
  //   var showTableID = document.getElementById("showTable");
  //   showTableID.style.display = "block";
  // }

}
