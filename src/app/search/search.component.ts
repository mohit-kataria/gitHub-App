import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { GitService } from '../git.service';
import { ToastrService } from 'ngx-toastr';
import { Location } from '@angular/common';


@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
  providers: [Location]
})
export class SearchComponent implements OnInit {
  public myToken: any;
  public searchData: any;
  public totalCount: any;
  public searchResult: any;
  public currentPage: number = 1;

  constructor(public route: ActivatedRoute, public router: Router, private gitService: GitService, public toastr: ToastrService, private loction: Location) {
    this.myToken = this.gitService.getSessionStorage();
    //console.log(this.myToken);
  }

  ngOnInit() {
    this.searchResult = this.route.snapshot.paramMap.get('name'); // capturing name to search
    //console.log(this.searchResult);
    this.userSearch();
  }

  // search function starts here ...
  public userSearch: any = () => {
    this.gitService.searchUser(this.searchResult, this.currentPage, this.myToken).subscribe((data: { total_count: any; items: any; }) => {
      // console.log(data)
      this.totalCount = data.total_count;
      this.searchData = data.items;
    },
      (error: { error: { message: string; }; status: any; statusText: any; }) => {
        console.log(error);
        this.toastr.error(error.error.message)
        this.router.navigate(['/error', error.status, error.statusText])
      })

  } // search function ends here ...

  // Go back method starts...
  public goBack: any = () => {
    this.loction.back();
  }// go back method ends...

  // function for next page button starts...
  public nextPage: any = () => {
    if ((this.totalCount / 15) > this.currentPage) {
      this.currentPage++;
      this.userSearch();
    }
    else {
      this.toastr.warning('No more pages to show')
    }
  } // function for next page button ends ...

  // function for previous page button starts ...
  public previousPage: any = () => {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.userSearch();
    }
    else {
      this.toastr.warning('No more pages remaining')
    }
  } // function for previous page button ends...

  // function to navigate to user's profile starts...
  public viewUser: any = (data) => {
    //console.log(data)
    this.router.navigate(['/user', data])
  }// function to navigate to user's profile ends...

}
