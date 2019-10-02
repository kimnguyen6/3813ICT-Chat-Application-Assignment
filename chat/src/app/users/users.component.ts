import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';
import { Route, Router, Data } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {

  users = [];
  updatedUsers = [];
  email = "";
  profile;
  userType;

  constructor(private router: Router, private datasharingservice: DataSharingService) { }

  ngOnInit() {
    this.profile = JSON.parse(sessionStorage.getItem("user"));
    this.userType = false;
    if(this.profile.type == "super") {
      this.userType = true;
    }

    if (this.profile.type == "normal") {
      alert("Only for Super & Group Admin");
      this.router.navigateByUrl('/profile');
    } else if (this.profile.type == "group assis"){
      alert("Only for Super & Group Admin");
      this.router.navigateByUrl('/profile');
    }
    
    this.datasharingservice.getUsers().subscribe(data => {
      this.users = data;
    }),
      (error: HttpErrorResponse) => {
        alert('Error');
      }
  }
  ngAfterViewInit(){}

  deleteUser(email:string){
    this.datasharingservice.deleteUser(email).subscribe(data => {
      this.users = data;
    });
  }

}
