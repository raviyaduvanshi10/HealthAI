import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient, private router:Router) { }

  getUser(_id: string): Observable<any> {
    // var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.server}/user/${_id}`);
  }

  createUser(formData: FormData): Observable<Object> {
    var _id = JSON.parse(localStorage.getItem("approvedCredential") || '{}').adminId;
    return this.http.post(`${environment.server}/registeruser`, formData);
  }

  predictDesease(formData: Object): Observable<Object> {
    return this.http.post(`${environment.server}/predictions`, formData);
  }

  updateUser(_id: string, formData: FormData): Observable<Object> {
    return this.http.put(`${environment.server}/user/${_id}`, formData);
  }

  deleteUser(_id: string, active: boolean): Observable<any> {
    return this.http.delete(`${environment.server}/user/${_id + active}`, { responseType: 'text' });
  }

  getUserList(): Observable<any> {
    var _id = JSON.parse(localStorage.getItem("approvedCredential") || '{}').adminId;
    return this.http.get(`${environment.server}/users/${_id}`);
  }

  loginUser(loginJson: any): Observable<any> {
    var loginType = JSON.parse(localStorage.getItem("loginCredential") || '{}').loginType;
    console.log(loginType);
    return this.http.post(`${environment.server}/userlogin`, loginJson);
  }


  getUserFile(userName: any): Observable<any> {
    return this.http.get(`${environment.server}/filehandling/${userName}`, { responseType: 'blob' })
  }

  getUserDocs(userName: any): Observable<any> {
    // var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.server}/userdochandling/${userName}`, { responseType: 'blob' })
  }

  getDocs(userName: any): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential") || '{}').adminId;
    return this.http.get(`${environment.server}/dochandling/${adminId + userName}`, { responseType: 'blob' })
  }

  getUserDetailById(_id: any): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential") || '{}').adminId;
    console.log(adminId);
    return this.http.get(`${environment.server}/userdetail/${adminId}`, _id);
  }


  getScheduleTask(): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential") || '{}').adminId;
    var employeeId = JSON.parse(localStorage.getItem("approvedCredential") || '{}')._employeeId;
    return this.http.get(`${environment.server}/scheduletask/${adminId + employeeId}`);
  }

  updateTask(formData: Object): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential") || '{}').adminId;
    return this.http.put(`${environment.server}/scheduletask/${adminId}`, formData);
  }

  scheduleTask(formData: FormData): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential") || '{}').adminId;
    return this.http.post(`${environment.server}/scheduletask/${adminId}`, formData);
  }
  logOut() {
    // this.dialog.open(LoginComponent, {width: '500px', height: '450px'});
    localStorage.removeItem("credential");
    localStorage.removeItem("approvedCredential");
    var auth = JSON.parse(localStorage.getItem("credential") || '{}');
    var auth1 = JSON.parse(localStorage.getItem("approvedCredential") || '{}');
    this.router.navigate(["/login"]);
    console.log(auth);
    console.log(auth1);
    console.log("Log out");
  }

  _userActionOccured: Subject<void> = new Subject();
  get userActionOccured(): Observable<void> { return this._userActionOccured.asObservable() };

  notifyUserAction() {
    this._userActionOccured.next();
  }

}
