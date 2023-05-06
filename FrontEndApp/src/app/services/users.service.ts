import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(private http: HttpClient) { }

  getUser(_id: string): Observable<any> {
    // var adminId = JSON.parse(localStorage.getItem("approvedCredential")).adminId;
    return this.http.get(`${environment.server}/user/${_id}`);
  }

  createUser(formData: FormData): Observable<Object> {
    var _id = JSON.parse(localStorage.getItem("approvedCredential") || '{}').adminId;
    return this.http.post(`${environment.server}/users/${_id}`, formData);
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
    return this.http.post(`${environment.server}/${loginType}`, loginJson);
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

}
