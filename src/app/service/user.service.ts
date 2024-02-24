import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../model/page';
import { User } from '../model/user';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  api = environment.baseApi + "/user";

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<Page> {
    return this.http.get<Page>(this.api+ '/all', {

      params: params
    });
    console.log(params);
  }

  getById(id: number): Observable<User> {
    return this.http.get<User>(this.api + "/get/" + id);
  }
  create(user: User): Observable<User> {
    return this.http.post<User>(this.api, user);
  }
  update(user: User): Observable<User> {
    return this.http.put<User>(this.api, user);
  }
  deleteById(id: number): Observable<any> {
    return this.http.delete<any>(this.api + "/" + id);
  }
}
