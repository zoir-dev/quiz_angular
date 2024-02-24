import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {environment} from 'src/environments/environment';
import {catchError} from "rxjs/operators";

@Injectable({
  providedIn: 'root'
})
export class FaylService {
  api = environment.baseApi + "/fayl";

  constructor(private http: HttpClient) {
  }

  // public uploadFayl(file: File): Observable<any> {
  //   const formData = new FormData();
  //   formData.append('file', file, file.name);
  //
  //   return this.http.post(this.api + "/upload", formData);
  // }
  //
  //
  // public downloadFile(id: number) {
  //   return this.http.get(this.api + "/download/" + id, { responseType: "blob" });
  // }

  public uploadFayl(file: File): Observable<any> {
    const formData = new FormData();
    formData.append('file', file, file.name);

    return this.http.post(this.api + "/upload", formData)
      .pipe(
        catchError(error => {
          console.error('Error uploading file:', error);
          throw error; // Rethrow the error after logging
        })
      );
  }

  getImageUrl(id: number): string {
    return this.api + "/download/" + id
  }

  public downloadFile(id: number) {
    this.http.get(this.api + '/download/' + id, {responseType: "blob"})
      .subscribe(data => {
        console.log(data)
      });
  }


}
