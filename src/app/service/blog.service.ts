import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../model/page';
import { Blog } from '../model/blog';

@Injectable({
  providedIn: 'root'
})
export class BlogService {
  api = environment.baseApi + "/blog"

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<Page> {
    return this.http.get<Page>(this.api , {
      params: params
    });
  }

  getById(id: number): Observable<Blog> {
    return this.http.get<Blog>(this.api + "/get/" + id);
  }

  create(blog: any): Observable<any> {
    return this.http.post<any>(this.api, blog);
  }

  update(blog: any): Observable<any> {
    return this.http.put<any>(this.api, blog);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<any>(this.api + "/get/" + id);
  }
}

