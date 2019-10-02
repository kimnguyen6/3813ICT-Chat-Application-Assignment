import { Component } from "@angular/core";
import { Router } from "@angular/router";
import { LoginComponent } from "./login/login.component";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  title = "chat";
  data;

  constructor(private router: Router) {}

  ngOnInIt() {}

  // Login Navigation
  loginLink() {
    if (
      JSON.parse(sessionStorage.getItem("user")) == undefined ||
      JSON.parse(sessionStorage.getItem("user")) == null
    ) {
      this.router.navigateByUrl("/login");
    }
  }

  //Register Navigation
  registerLink() {
    if (
      JSON.parse(sessionStorage.getItem("user")) !== undefined ||
      JSON.parse(sessionStorage.getItem("user")) !== null
    ) {
      this.router.navigateByUrl("/register");
    }
  }
  
  //Profile Navigation
  profileLink() {
    if (
      JSON.parse(sessionStorage.getItem("user")) != undefined ||
      JSON.parse(sessionStorage.getItem("user")) !== null
    ) {
      this.router.navigateByUrl("/profile");
    } else {
      this.router.navigateByUrl("/login");
    }
  }
  // Users Navigation
  usersLink() {
    if (
      JSON.parse(sessionStorage.getItem("user")) != undefined ||
      JSON.parse(sessionStorage.getItem("user")) !== null
    ) {
      this.router.navigateByUrl("/users");
    } else {
      this.router.navigateByUrl("/login");
    }
  }
  // Groups Navigation
  groupsLink() {
    if (
      JSON.parse(sessionStorage.getItem("user")) != undefined ||
      JSON.parse(sessionStorage.getItem("user")) !== null
    ) {
      this.router.navigateByUrl("/groups");
    } else {
      this.router.navigateByUrl("/login");
    }
  }
  //Logs user out
  logOut() {
    if (typeof Storage !== "undefined") {
      localStorage.clear();
      sessionStorage.clear();
      this.router.navigateByUrl("/login");
    }
  }
}
