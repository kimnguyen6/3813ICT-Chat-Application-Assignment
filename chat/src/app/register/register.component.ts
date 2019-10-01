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

  constructor(private router: Router, private datasharingservice: DataSharingService) { }

  ngOnInit() {
  }

  createUser(){
    this.datasharingservice
      .register(
        this.email,
        this.password,
        this.userName,
        this.birthday,
        this.age
      )
      
      .subscribe(data => {
        var dataJSON = JSON.stringify(data);
        console.log(data.email);
      })
  }
}
