import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {
  data;

  constructor() { }

  ngOnInit() {
    if (typeof Storage !== "undefined"){
      this.data = JSON.parse(sessionStorage.getItem("user"));
    }
  }

}
