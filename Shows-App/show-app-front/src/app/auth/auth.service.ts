import { Injectable } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { Router } from "@angular/router";
import { Subject } from "rxjs";

import { environment } from "../../environments/environment";
import { AuthData } from "./auth-data.model";

const BACKEND_URL = environment.apiUrl + "/user/";

@Injectable({ providedIn: "root" })
export class AuthService {
  private isAuthenticated = false;
  private token: string;
  private tokenTimer: any;
  private userId: string;
  private authStatusListener = new Subject<{ isAuthenticated: boolean, username: string }>();
  private authPasswordChangedListener = new Subject<boolean>(); // isPasswordChanged
  private username: string;

  constructor(private http: HttpClient, private router: Router) { }

  getToken() {
    return this.token;
  }

  getIsAuth() {
    return this.isAuthenticated;
  }

  getUserId() {
    return this.userId;
  }

  getUsername() {
    return this.username;
  }

  getAuthStatusListener() {
    return this.authStatusListener.asObservable();
  }

  getauthPasswordChangedListener() {
    return this.authPasswordChangedListener.asObservable();
  }

  createUser(email: string, username: string, password: string) {
    const authData: AuthData = { email: email, username: username, password: password };
    this.http.post(BACKEND_URL + "signup", authData).subscribe({
      next: res => {
        console.log("next >>> res ", res);
      },
      error: error => {
        this.authStatusListener.next({ isAuthenticated: false, username: "" });
      },
      complete: () => {
        this.router.navigate(["/"]);
        console.log("complete??");
      }
    });
  }

  login(email: string, username: string, password: string) {
    const authData: AuthData = { email: email, username: username, password: password };
    console.log(BACKEND_URL + "login");
    this.http
      .post<{ token: string; expiresIn: number; userId: string, username: string }>(
        BACKEND_URL + "login",
        authData
      )
      .subscribe({
        next: response => {
          const token = response.token;
          this.token = token;
          if (token) {
            const expiresInDuration = response.expiresIn;
            this.setAuthTimer(expiresInDuration);
            this.isAuthenticated = true;
            this.userId = response.userId;
            this.username = response.username;
            this.authStatusListener.next({ isAuthenticated: true, username: this.username });
            const now = new Date();
            const expirationDate = new Date(
              now.getTime() + expiresInDuration * 1000
            );
            console.log(expirationDate);
            this.saveAuthData(token, expirationDate, this.userId, this.username);
            this.router.navigate(["/"]);

            console.log("login Seccess ");
          }
        },
        error: error => {
          console.log("login error ", error);
          this.authStatusListener.next({ isAuthenticated: false, username: "" });
        }
      }
      );
  }

  autoAuthUser() {
    const authInformation = this.getAuthData();
    if (!authInformation) {
      return;
    }
    const now = new Date();
    const expiresIn = authInformation.expirationDate.getTime() - now.getTime();
    if (expiresIn > 0) {
      this.token = authInformation.token;
      this.isAuthenticated = true;
      this.userId = authInformation.userId;
      this.username = authInformation.username;
      this.setAuthTimer(expiresIn / 1000);
      this.authStatusListener.next({ isAuthenticated: true, username: this.username });
    }
  }

  logout() {
    this.token = null;
    this.isAuthenticated = false;
    this.authStatusListener.next({ isAuthenticated: false, username: "" });
    this.userId = null;
    this.username = null;
    clearTimeout(this.tokenTimer);
    this.clearAuthData();
    this.router.navigate(["/"]);
  }

  private setAuthTimer(duration: number) {
    console.log("Setting timer: " + duration);
    this.tokenTimer = setTimeout(() => {
      this.logout();
    }, duration * 1000);
  }

  private saveAuthData(token: string, expirationDate: Date, userId: string, username: string) {
    localStorage.setItem("token", token);
    localStorage.setItem("expiration", expirationDate.toISOString());
    localStorage.setItem("userId", userId);
    localStorage.setItem("username", username);
  }

  private clearAuthData() {
    localStorage.removeItem("token");
    localStorage.removeItem("expiration");
    localStorage.removeItem("userId");
    localStorage.removeItem("username");
  }

  private getAuthData() {
    const token = localStorage.getItem("token");
    const expirationDate = localStorage.getItem("expiration");
    const userId = localStorage.getItem("userId");
    const username = localStorage.getItem("username");
    if (!token || !expirationDate) {
      return null;
    }
    return {
      token: token,
      expirationDate: new Date(expirationDate),
      userId: userId,
      username: username
    };
  }

  SaveNewPassword(email: string, password: string, newPassword: string) {

    const newPasswordObj = { email, password, newPassword };

    console.log("newPasswordObj", newPasswordObj);

    this.http.post(BACKEND_URL + "changepassword", newPasswordObj).subscribe({
      next: res => {
        console.log("next >>> res ", res);
      },
      error: error => {
        this.authPasswordChangedListener.next(false);
      },
      complete: () => {
        this.router.navigate(["/"]);
        console.log("complete??");
      }
    });

  }

  forgotPassword(email, username) {

    const forgotPasswordObj = { email, username };

    console.log("forgotPasswordObj", forgotPasswordObj);

    this.http.post(BACKEND_URL + "forgotpassword", forgotPasswordObj).subscribe({
      next: res => {
        console.log("next >>> res , send to the mail", res);
      },
      error: error => {
        this.authPasswordChangedListener.next(false);
        console.log(error);
      },
      complete: () => {
        this.router.navigate(["/"]);
        console.log("complete??");
      }
    });

  }

  quickEnter() {
    this.http.get(BACKEND_URL + "quickenter").subscribe({
      next: res => {
        // need to like the login.
      },
      error: error => {
        // need to like the login.
      },
      complete: () => {
        // need to like the login.
      }
    });
  }
}
