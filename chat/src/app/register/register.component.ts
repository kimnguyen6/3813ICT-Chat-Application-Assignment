import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';
import { Route, Router, Data } from '@angular/router';
import { HttpErrorResponse } from '@angular/common/http';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: "";
  password: "";
  userName: "";
  birthday: Date;
  age: number;
  super = false;
  type = "";
  valid: boolean;

  profile;

  constructor(private router: Router, private datasharingservice: DataSharingService) { }

  ngOnInit() {
    this.profile = JSON.parse(sessionStorage.getItem("user"));

    if (this.profile.type == "normal") {
      alert("Only for Super & Group Admin");
      this.router.navigateByUrl("/profile");
    } else if (this.profile.type == "group assis") {
      alert("Only for Super & Group Admin");
      this.router.navigateByUrl("/profile");
    }
  }

  createUser(){
    console.log(this.birthday, this.age);
    if (this.email === undefined || this.email == ""){
      alert("Email cannot be empty");
      return;
    } else if (this.userName === undefined || this.userName == ""){
      alert("Username cannot be empty");
      return;
    } else if (this.password === undefined || this.password == ""){
      alert("Password cannot be empty");
      return;
    } else if (this.type === undefined || this.type == ""){
      alert("Type cannot be empty");
      return;
    } else if (this.birthday === undefined){
      alert("Birthday cannot be empty");
      return;
    } else if (this.age === undefined) {
      alert("Age cannot be empty");
      return;
    } else {
      this.datasharingservice.register(this.email, this.password, this.userName, this.birthday, this.type).subscribe(data =>{
        var dataJSON = JSON.stringify(data);

        if (data.valid === "emailFalse"){
          alert("Email already exists");
        } else if (data.valid === "usernameFalse"){
          alert("Username already exists");
        } else if (data.valid === "bothFalse"){
          alert("Both already exists");
        } else {
          var dataJSON = JSON.stringify(data);
          this.router.navigateByUrl("/users");
        }
      });
    }
  }
}
