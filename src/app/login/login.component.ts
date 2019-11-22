import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GitService } from '../git.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  public userName: any;
  public userToken: any;
  public token: any;
  public details: any;

  constructor(public gitService: GitService, public router: Router, public toastr: ToastrService, public cookieService: CookieService) { }

  ngOnInit() {
    if (this.gitService.getSessionStorage() && this.cookieService.get('myName')) {
      this.toastr.success('You are already logged in.')
      this.router.navigate(['/user', this.cookieService.get('myName')])
    }
  }
  // log in function starts...
  public getIn() {
    if (!this.userName) {
      this.toastr.warning('Enter Username')
    }
    else if (!this.userToken) {
      this.toastr.warning('Enter your Token')
    }
    else {

    }
    this.gitService.logInFunction(this.userToken).subscribe(
      (data: any) => {
        //console.log(data)
        this.details = data;
        if (this.userName == this.details['login']) {
          setTimeout(() => {
            this.router.navigate(['/user', this.userName])
          }, 1000)
          this.gitService.setSessionStorage(this.userToken)
          this.cookieService.set('myName', this.userName)
        }
        else {
          this.toastr.error('Incorrect Username')
        }

      },
      (error: { error: { message: string; }; status: any; statusText: any; }) => {
        console.log(error)
        //console.log(error.error.message)
        this.toastr.error(error.error.message)
        this.router.navigate(['/error', error.status, error.statusText])
      })
  }// log in function ends...
}
