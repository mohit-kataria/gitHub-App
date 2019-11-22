import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GitService {

  private baseUrl = 'https://api.github.com';

  constructor(private http: HttpClient) {
  }

  // method for setting token in session storage
  public setSessionStorage(data: any) {
    sessionStorage.setItem('token', (data));
  }

  //method for getting token from session storage
  public getSessionStorage() {
    return sessionStorage.getItem('token')
  }

  // request for authentication starts here ...
  public logInFunction: any = (data: any) => {
    return this.http.get(`${this.baseUrl}/user?access_token=${data}`)
  } // request for authentication ends here ...

  //request for checking the rate limit starts...
  public rateLimit() {
    return this.http.get(`${this.baseUrl}/rate_limit?access_token=${this.getSessionStorage()}`)
  }// request for checking the rate limit ends...

  // request for getting the user details starts here...
  public userDetails: any = (data: any, token: any) => {
    console.log(this.getSessionStorage())
    let myResult = this.http.get(`${this.baseUrl}/users/${data}?access_token=${token}`);
    return myResult;
  }// request for getting the user details ends here...

  // request for searching the user starts here ...
  public searchUser: any = (data: any, page: any, token: any) => {
    let myResult = this.http.get(`${this.baseUrl}/search/users?q=${data}&page=${page}&per_page=15&access_token=${token}`);
    return myResult;
  }// request for searching the user ends...

  // request to get the repos of the user starts...
  public repos: any = (data: any, token: any) => {
    let myResult = this.http.get(`${this.baseUrl}/users/${data}/repos?access_token=${token}`);
    return myResult;
  }// request to get the repos ends here...

  // request to get the gists of the user starts here...
  public gists: any = (data: any, token: any) => {
    let myResult = this.http.get(`${this.baseUrl}/users/${data}/gists?access_token=${token}`);
    return myResult;
  }// request to get the gists ends here...

  // request to get the followers data starts...
  public followers: any = (data: any, token: any) => {
    let myResult = this.http.get(`${this.baseUrl}/users/${data}/followers?access_token=${token}`);
    return myResult;
  }//request to get the followers data ends...

  //request to get the following ppl data starts here...
  public following: any = (data: any, token: any) => {
    let myResult = this.http.get(`${this.baseUrl}/users/${data}/following?access_token=${token}`);
    return myResult;
  }// request to get the following ppl data ends...

  // error handling method starts...
  private handleError(err: HttpErrorResponse) {
    console.log("handle error Http calls");
    console.log(err.message);
    return Observable.throw(err.message);
  } // error handling method ends...


}
