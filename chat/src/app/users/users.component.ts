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
  super = false;
  group = false;
  profile;

  constructor(private router: Router, private datasharingservice: DataSharingService) { }

  ngOnInit() {
    this.profile = JSON.parse(sessionStorage.getItem("user"));

    if (this.profile.type == "super") {
      this.super = true;
    } else {
      alert("Super Admin Only");
      this.router.navigateByUrl('/profile');
    }
    
    this.datasharingservice.getUsers().subscribe(data => {
      this.users = data;
    }),
      (error: HttpErrorResponse) => {
        alert('Error');
      }
  }

}
