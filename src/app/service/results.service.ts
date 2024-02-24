import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../model/page';
import { Results } from '../model/results';

@Injectable({
  providedIn: 'root'
})
export class ResultsService {
  api = environment.baseApi + "/overall";

  constructor(private http: HttpClient) { }

  // get all results
  getAll(params: any): Observable<Page> {
    return this.http.get<Page>(this.api, {
      params: params
    });
  }

  // get one result
  getById(id: number): Observable<any> {
    return this.http.get<any>(this.api + "/get/questionl/" + id);
  }

  // add result
  create(result: any): Observable<any> {
    return this.http.post(this.api + "/save", result);
  }


}
