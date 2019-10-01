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
  selectedMember;
  selectedAssis;

  constructor(private router: Router, private datasharingserve: DataSharingService) { }

  ngOnInit() {
    this.profile = JSON.parse(sessionStorage.getItem("user"));

    if(this.profile.type == "normal"){
      alert("Only for Super & Group Admin");
      this.router.navigateByUrl("/account");
    } else if (this.profile.type == "group assis") {
      alert("Only for Super & Group Admin");
      this.router.navigateByUrl("/account");
    }
    this.datasharingserve.getUsers().subscribe(data => {
      this.users = data;
    })
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
        console.log(memberValid);

        this.members.push(this.selectedMember);
      }
    }

    if(this.members.length == 0) {
      this.members.push(this.selectedMember);
    }
  }

  createGroups(){
    this.datasharingserve.createGroup(this.group, this.members, this.selectedAssis).subscribe(data => {
      if(!data) {
        alert("Group name already exists, create another name");
      }
      console.log(data);
    });
    this.router.navigateByUrl('/groups');
  }
}
