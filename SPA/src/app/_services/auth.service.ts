import { Injectable } from '@angular/core';
import { map, catchError } from 'rxjs/operators';
import { Observable, throwError } from 'rxjs';
import { environment } from '../../environments/environment';
import { JwtHelperService } from '@auth0/angular-jwt';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { AuthUser } from '../_models/authUser';
import { User } from '../_models/User';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';

@Injectable()
export class AuthService {

  baseUrl = environment.apiUrl + 'auth/';
  userToken: any;
  decodedToken: any;
  currentUser: User;
  // default NavBar photo as BS
  private photoUrl = new BehaviorSubject<string>('../../assets/user.png');
  // observable object for BS photo, to subscribe from all components
  currentPhotoUrl = this.photoUrl.asObservable();

constructor(
  private http: HttpClient,
  private jwtHelperSerice: JwtHelperService) { }

  changeMemberPhoto(photoUrl) {
    this.photoUrl.next(photoUrl);
  }

  login(model: any) {
    return this.http.post<AuthUser>(this.baseUrl + 'login', model, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    })
    .pipe(
      map(user => {
        if (user) {
          localStorage.setItem('token', user.tokenString);
          localStorage.setItem('user', JSON.stringify(user.user));
          this.currentUser = user.user;
          this.decodedToken = this.jwtHelperSerice.decodeToken(user.tokenString);
          this.userToken = user.tokenString;
          if (this.currentUser.photoUrl != null) {
            this.changeMemberPhoto(this.currentUser.photoUrl);
          } else {
            this.changeMemberPhoto('../../assets/user.png');
          }
        }
      })
    );
  }

  register(user: User) {
    return this.http.post<User>(this.baseUrl + 'register', user, {
      headers: new HttpHeaders().set('Content-Type', 'application/json')
    });
  }

  loggedIn() {
    const token = this.jwtHelperSerice.tokenGetter();
    if (!token) {
      return false;
    }
    return !this.jwtHelperSerice.isTokenExpired(token);
  }

  roleMatch(allowedRoles: string[]): boolean {
    let isMatch = false;
    const userRoles = this.decodedToken.role as Array<string>;
    allowedRoles.forEach(element => {
      if (userRoles.includes(element)) {
        isMatch = true;
        return;
      }
    });
    return isMatch;
  }
}
