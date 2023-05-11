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

  updateUser(formData: Object): Observable<Object> {
    return this.http.put(`${environment.server}/registeruser`, formData);
  }

  deletePrediction(_id: string): Observable<any> {
    return this.http.delete(`${environment.server}/saveprediction/${_id}`, { responseType: 'text' });
  }

  getUserList(): Observable<any> {
    return this.http.get(`${environment.server}/registeruser`);
  }

  loginUser(loginJson: any): Observable<any> {
    var loginType = JSON.parse(localStorage.getItem("loginCredential") || '{}').loginType;
    console.log(loginType);
    return this.http.post(`${environment.server}/userlogin`, loginJson);
  }


  // getUserFile(userName: any): Observable<any> {
  //   return this.http.get(`${environment.server}/filehandling/${userName}`, { responseType: 'blob' })
  // }

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


  getSavedPrediction(): Observable<any> {
    var userId = JSON.parse(localStorage.getItem("approvedCredential") || '{}')._userId;
    return this.http.get(`${environment.server}/saveprediction/${userId}`);
  }

  updateTask(formData: Object): Observable<any> {
    var adminId = JSON.parse(localStorage.getItem("approvedCredential") || '{}').adminId;
    return this.http.put(`${environment.server}/scheduletask/${adminId}`, formData);
  }

  savePrediction(formData: Object): Observable<any> {
    var id = JSON.parse(localStorage.getItem("approvedCredential") || '{}')._userId;
    return this.http.post(`${environment.server}/saveprediction/${id}`, formData);
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
