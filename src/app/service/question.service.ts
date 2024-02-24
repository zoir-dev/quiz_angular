import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, filter, map, Observable, tap } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Page } from '../model/page';
import { Question } from '../model/question';

@Injectable({
  providedIn: 'root',
})
export class QuestionService {
  api = environment.baseApi;

  private allTests$$ = new BehaviorSubject<any>([]);
  readonly selectedGroupTests$$ = new BehaviorSubject<any>([]);

  constructor(private http: HttpClient) {}

  loadAllTests() {
    this.http.get<Page>(this.api + '?params=10').subscribe((res: any) => {
      this.allTests$$.next(res.content);
    });
  }

  // filter question list by group name
  setTestsByGroup(groupName = '') {
    if (groupName != '')
      this.allTests$$
        .pipe(
          map((items) =>
            items.filter((item: any) => item.questionLevel.level == groupName)
          )
        )
        .subscribe((res: any) => {
          this.selectedGroupTests$$.next(res);
        });
  }

  // get all group by questions
  getTestsByGroup() {
    return this.selectedGroupTests$$.asObservable();
  }

  getAll(params: any): Observable<Page> {
    return this.http.get<Page>(this.api + '/question', {
      params: params,
    });
  }

  blockTest(boolean: boolean) {
    return this.http.post<boolean>(this.api + '/question/block', boolean);
  }

  getById(id: number): Observable<Question> {
    return this.http.get<Question>(this.api + '/get/' + id);
  }

  create(question: any): Observable<any> {
    return this.http.post<any>(this.api + '/question', question);
  }

  update(id: number, question: any): Observable<any> {
    const url = this.api + '/question/' + id;
    return this.http.put<any>(url, question);
  }

  deleteById(id: number): Observable<any> {
    return this.http.delete<any>(this.api + '/question/' + id);
  }
}
