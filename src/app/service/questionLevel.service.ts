import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, groupBy, map, mergeMap, Observable, toArray } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../model/page';
import { QuestionLevel } from '../model/questionLevel';

@Injectable({
  providedIn: 'root'
})
export class QuestionLevelService {
  api = environment.baseApi + "/level";

  constructor(private http: HttpClient) { }

  getAll(params: any): Observable<Page> {
    return this.http.get<Page>(this.api, {
      params: params
    });
  }

  getById(id: number): Observable<QuestionLevel> {
    return this.http.get<QuestionLevel>(this.api + "/get/" + id);
  }

  create(questionLevel: any): Observable<any> {
    return this.http.post(this.api, questionLevel);
  }

  update(questionLevel: any): Observable<any> {
    return this.http.put(this.api, questionLevel);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete(this.api + "/get/" + id);
  }
}
