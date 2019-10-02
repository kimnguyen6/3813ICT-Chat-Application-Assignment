import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';
import { Route, Router, Data } from '@angular/router';

@Component({
  selector: 'app-create-group',
  templateUrl: './create-group.component.html',
  styleUrls: ['./create-group.component.css']
})
export class CreateGroupComponent implements OnInit {
  profile;
  group;
  members = [];
  users;
  groupAdmin;

  selectedMember;
  selectedAssis;

  constructor(private router: Router, private datasharingservice: DataSharingService) { }

  ngOnInit() {
    this.profile = JSON.parse(sessionStorage.getItem("user"));

    this.groupAdmin = this.profile.username;
    if(this.profile.type == "normal"){
      alert("Only for Super & Group Admin");
      this.router.navigateByUrl("/account");
    } else if (this.profile.type == "group assis") {
      alert("Only for Super & Group Admin");
      this.router.navigateByUrl("/account");
    }
    this.datasharingservice.getUsers().subscribe(data => {
      data.forEach((user, index) => {
        if ((this.profile.type == "group" && user.username == this.profile.username) ||
            (this.profile.type == "super" && user.username == this.profile.username)) 
            {
              data.splice(index, 1);
            }
      })
      this.users = data;
    });
  }
  
  addMembers(){
    let memberValid = true;

    for(let x = 0; x < this.members.length; x++) {
      if (this.members[x] == this.selectedMember) {
        memberValid = false;
        break;
      }
    }

    if (this.members.length > 0) {
      if(memberValid == true) {
        this.members.push(this.selectedMember);
      }
    }

    if(this.members.length == 0) {
      this.members.push(this.selectedMember);
    }
  }

  createGroups(){
    if(this.group == undefined || this.group == "") {
      alert("Group name not allowed to be empty");
    } else if (this.members.length == 0) {
      alert("members not allowed to be empty");
    } else if (this.selectedAssis === undefined || this.selectedAssis == "") {
      alert("Group Assis not allowed to be empty");
    } else {
      this.members.push(this.selectedAssis);
      this.members.push(this.groupAdmin);

      this.datasharingservice.createGroup(
        this.group,
        this.members,
        this.selectedAssis,
        this.groupAdmin
      )
      .subscribe(data => {
        if(!data) {
          alert("Group name already exists");
        } else {
          this.router.navigateByUrl("/groups");
        }
      });
    }
  }
}
