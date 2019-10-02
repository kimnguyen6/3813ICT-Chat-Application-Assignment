import { Component, OnInit } from '@angular/core';
import { Route, Router, Data } from '@angular/router';
import { DataSharingService } from '../services/data-sharing.service';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  email: "";
  password: "";

  constructor(private router: Router, private datasharingservice: DataSharingService) { }

  ngOnInit() {
  }

  itemClicked() {
    this.datasharingservice.logIn(this.email, this.password).subscribe(data => {
      if (data.valid === true) {
        var dataJson = JSON.stringify(data);
        localStorage.setItem("user", dataJson);
        sessionStorage.setItem("user", dataJson);
        this.router.navigateByUrl("/profile");
      }
    }),
      (error: HttpErrorResponse) => {
        alert("Error");
      };
  }

}
