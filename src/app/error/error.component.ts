import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css'],
  providers: [Location]
})
export class ErrorComponent implements OnInit {
  public errorCode: any;
  public errorMessage: any;
  public errCodes: any = ['400', '401', '402', '403', '404', '405', '406', '407', '408', '409', '410', '411', '412', '413', '414', '415', '416', '417', '421', '422', '426', '428', '429', '431', '500', '501', '502', '503', '504', '505', '506', '507', '508', '510', '511']

  constructor(private route: ActivatedRoute, public router: Router, public toastr: ToastrService, public location: Location, public cookie: CookieService) { }

  ngOnInit() {
    let myCode = this.route.snapshot.paramMap.get('code'); //capturing error code
    //console.log(typeof myCode)
    let myMessage = this.route.snapshot.paramMap.get('message'); //capturing error message
    //debugger;
    if (this.errCodes.includes(myCode)) {
      this.errorCode = myCode;
      this.errorMessage = myMessage;
    }

    else {
      this.errorCode = "Error Occured";
      this.errorMessage = "Please go back."
    }


  }
  // navigate back to profile method starts ...
  public goToProfile: any = () => {
    this.router.navigate(['/user', this.cookie.get('myName')]);
  }// navigate to profile method ends...

}
