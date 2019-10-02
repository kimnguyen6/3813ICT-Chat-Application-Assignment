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
      console.log(data);
      var dataJson = JSON.stringify(data);
      console.log(dataJson);

      if (data.valid === true) {
        sessionStorage.setItem("user", dataJson);
        this.router.navigateByUrl("/profile");
      }
    }),
      (error: HttpErrorResponse) => {
        alert("Error");
      };
  }

}
