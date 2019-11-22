import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GitService } from '../git.service';
import { ToastrService } from 'ngx-toastr';
import { CookieService } from 'ngx-cookie-service';
import { Location } from '@angular/common';


@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css'],
  providers: [Location]
})
export class UserComponent implements OnInit {
  public myToken: any;
  public userName: any;
  public currentUserData: any;
  public allRepos: any;
  public availableRepos: boolean = false;
  public allGistsData: any;
  public gistData: any;
  public availableGists: boolean = false;
  public allFollowers: any;
  public hasFollowers: boolean = false;
  public allFollowing: any;
  public isFollowing: boolean = false;
  public myName: any;


  constructor(public route: ActivatedRoute, public router: Router, private gitService: GitService, public toastr: ToastrService, public cookieService: CookieService, private loction: Location) {
    this.myToken = this.gitService.getSessionStorage()// getting token from storage
    //console.log(this.myToken)
    this.myName = this.cookieService.get('myName')// geting logged in user name from cookie
  }

  ngOnInit() {
    this.userName = this.route.snapshot.paramMap.get('username')// getting username from url
    console.log(this.userName)
    this.checkUser();// checks for token and usernamen of the logged in user
    this.currentUser();// getting details of the user
    this.rate();// only to check the rate limit usage


  }

  // method to check authenticity...
  public checkUser: any = () => {
    if (this.myToken == null || this.myToken == undefined || this.myToken == '') {
      this.cookieService.delete('myName')
      this.router.navigate(['/login'])
      this.toastr.error('Sign in again.', 'Please');
    }
    else if (this.myName == null || this.myName == undefined || this.myName == '') {
      sessionStorage.removeItem('token');
      this.router.navigate(['/login'])
      this.toastr.error('Sign in again.', 'Please');

    }
    else {
      //this.toastr.success(this.userName, 'Welcome')
    }
  }

  // method to get details of the user starts...
  public currentUser: any = () => {
    this.gitService.userDetails(this.userName, this.myToken).subscribe((data: any) => {
      // console.log(data)
      this.currentUserData = data;
      console.log(this.currentUserData.avatar_url)

      this.repositories();
      this.gists();
      this.followers();
      this.following();

    },
      (error: { error: { message: string; }; status: any; statusText: any; }) => {
        console.log(error);
        this.toastr.error(error.error.message)
        this.router.navigate(['/error', error.status, error.statusText])
      })
  }// method to get details ends here...

  // method to nevigate to searc view with searched username...
  public userSearch: any = (data: any) => {
    console.log(data)
    this.router.navigate(['/search', data])
  }

  // log out method starts here...
  public logout: any = () => {
    sessionStorage.removeItem('token');
    this.cookieService.delete('myName')
    this.toastr.success('Logging you out.')
    setTimeout(() => {
      this.router.navigate(['/login'])
    }, 1000)

  }// logout method ends here...

  // redirects to the logged in user profile
  public myProfile: any = () => {
    console.log('my Profile clicked')
    this.currentUser();
    this.router.navigate(['/user', this.myName])
    setTimeout(() => {
      window.location.reload()
    }, 500)
  }

  // method to get all repos of the user starts here...
  public repositories: any = () => {
    this.gitService.repos(this.userName, this.myToken).subscribe((data: { length: number; }) => {
      //console.log(data)
      if (data.length > 0) {
        this.availableRepos = true;
        this.allRepos = data;
      }
      else {
        this.availableRepos = false;
      }
    },
      (error: { error: { message: string; }; status: any; statusText: any; }) => {
        console.log(error);
        this.toastr.error(error.error.message)
        this.router.navigate(['/error', error.status, error.statusText])
      })
  }// method to get all repos ends here...

  // open selected github repo in another tab...
  public openRepo: any = (repo: string) => {
    window.open(repo);
  }

  // method to get all the repos of user starts here...
  public gists: any = () => {
    this.gitService.gists(this.userName, this.myToken).subscribe((data: any) => {
      //console.log(data)
      this.allGistsData = data;
      let gistsList: any[] = [];
      //console.log(this.allGistsData[0].files)
      for (let i = 0; i < this.allGistsData.length; i++) {
        for (let k in this.allGistsData[i].files) {
          console.log(k)
          gistsList.push({ "name": k, "url": this.allGistsData[i].html_url })
        }
      }
      if (gistsList.length > 0) {
        this.availableGists = true;
        this.gistData = gistsList;
        console.log(this.gistData)
      }
      else {
        this.availableGists = false;
      }

    },
      (error: { error: { message: string; }; status: any; statusText: any; }) => {
        console.log(error);
        this.toastr.error(error.error.message)
        this.router.navigate(['/error', error.status, error.statusText])
      })
  }// end of method to get all repos...

  //opens selected github gist in another tab...
  public openGists: any = (gist: string) => {
    window.open(gist);
  }

  //method to get the followers of the user starts here...
  public followers: any = () => {
    this.gitService.followers(this.userName, this.myToken).subscribe((data: { length: number; }) => {
      //console.log(data)
      if (data.length > 0) {
        this.hasFollowers = true;
        this.allFollowers = data;
      }
      else {
        this.hasFollowers = false;
      }
    },
      (error: { error: { message: string; }; status: any; statusText: any; }) => {
        console.log(error);
        this.toastr.error(error.error.message)
        this.router.navigate(['/error', error.status, error.statusText])
      })
  }// end of the method to get followers..

  // opens github dashboard of the selected follower in another tab...
  public followerProfile: any = (name) => {
    window.open(name)
  }

  // method to get the data of users followed by the selected user starts...
  public following: any = () => {
    this.gitService.following(this.userName, this.myToken).subscribe((data: { length: number; }) => {
      console.log(data)
      if (data.length > 0) {
        this.isFollowing = true;
        this.allFollowing = data;
      }
      else {
        this.isFollowing = false;
      }
    },
      (error: { error: { message: string; }; status: any; statusText: any; }) => {
        console.log(error);
        this.toastr.error(error.error.message)
        this.router.navigate(['/error', error.status, error.statusText])
      })
  }// end of the following method...

  // opens the selected user's github dashboard in another tab...
  public followingProfile: any = (name) => {
    window.open(name)
  }

  // method to check rate limit starts...
  public rate: any = () => {
    this.gitService.rateLimit().subscribe(data => {
      console.log(data)
    },
      error => {
        console.log(error);
        //this.toastr.error(error.error.message)
        //this.router.navigate(['/error',error.status,error.statusText])
      })
  }// rate limit method ends here... (used only to check rate limit)

}
