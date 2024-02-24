import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { JwtHelperService } from '@auth0/angular-jwt';
import { BehaviorSubject, Observable, Subject } from 'rxjs';
import { environment } from 'src/environments/environment';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  readonly API_URL = `${environment.baseApi}`;
  readonly TOKEN_KEY = 'quiz-app-token';
  user:any
  isUserAuthenticated: boolean = false;
  authListener: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  constructor(
    private http: HttpClient,
    private router: Router,
    private activateRoute: ActivatedRoute
  ) { }

  // Currently logged in users data
  public getCurrentUser() {
    return this.http.get(`${this.API_URL}/current-user`)
  }


  login(username: string, password: any) {
    const loginData = { username: username, password: password };

    this.http
      .post<{ token: string }>(
        `${this.API_URL}/account/authenticate`,
        loginData
      )
      .subscribe(
        (response) => {
          if (response.token) {
            let returnUrl = this.activateRoute.snapshot.queryParamMap.get('returnUrl');

            const token = response.token;
            this.isUserAuthenticated = true;
            this.authListener.next(true);

            sessionStorage.setItem(this.TOKEN_KEY, token);

            sessionStorage.setItem('user_id', username);

            this.router.navigate([returnUrl || '/']);

            console.log(response);
            this.decodedToken();
          }
        },
        (err) => {
          Swal.fire({
            title: 'Ops...',
            text: 'Login yoki Parol xato!',
            icon: 'error',
            timer: 1500,
            showConfirmButton: true,
          });
          console.log(err);
        }
      );
  }

  signup(formSignUp: any) {
    this.http.post(this.API_URL + '/account/register', formSignUp).subscribe((response) => {
      if (response) {
        Swal.fire({
          title: 'Muvaffaqiyatli...',
          text: "Siz muvaffaqiyatli ro'yxatdan o'tdingiz!",
          icon: 'success',
          timer: 1500,
        });
      }
    });
  }

  getToken() {
    const token = sessionStorage.getItem(this.TOKEN_KEY);
    if (token) {
      this.isUserAuthenticated = true;
      this.authListener.next(this.isUserAuthenticated);
      return token;
    } else {
      this.isUserAuthenticated = false;
      this.authListener.next(this.isUserAuthenticated);
      return null;
    }
  }

  decodedToken() {
    const token = sessionStorage.getItem(this.TOKEN_KEY);
    if (token) {
      const helper = new JwtHelperService();
      const decode = helper.decodeToken(token);
      console.log(decode);
      return decode;
    }
  }

  getAuthListener() {
    return this.authListener.asObservable();
  }

  logout() {
    this.isUserAuthenticated = false;
    this.authListener.next(false);
    localStorage.removeItem(this.TOKEN_KEY);
    sessionStorage.removeItem(this.TOKEN_KEY);
    this.router.navigate(['/home']);
  }

}
