import { Component, OnInit, AfterViewInit } from "@angular/core";
import { DataSharingService } from "../services/data-sharing.service";
import { Route, Router, Data } from "@angular/router";
import { ChannelsComponent } from "../channels/channels.component";

@Component({
  selector: "app-groups",
  templateUrl: "./groups.component.html",
  styleUrls: ["./groups.component.css"]
})
export class GroupsComponent implements OnInit {
  groups;
  profile;
  valid;
  users;
  inviteMember;
  constructor(private router: Router, private datasharingservice: DataSharingService) {}

  ngOnInit() {
    this.datasharingservice.getGroups().subscribe(data => {
      this.groups = data;
      this.datasharingservice.getUsers().subscribe(data => {
        this.users = data;
      });
      console.log(this.groups);
    });
    this.profile = JSON.parse(sessionStorage.getItem("user"));
  }

  // delete group
  deleteGroup(group: string) {
    this.datasharingservice.deleteGroup(group).subscribe(data => {
      this.groups = data;
    });
  }

  // Delete members
  deleteMember(member: string, group: string) {
    this.datasharingservice.deleteMember(member, group).subscribe(data => {
      this.groups = data;
    });
  }

  // change object into array
  toArray(members: object) {
    return Object.keys(members).map(key => members[key]);
  }

  // views the channels, sends data to sessionstorage
  viewChannel(group) {
    sessionStorage.setItem("currentGroup", group);
    this.router.navigateByUrl("/groups/channels");
  }

  // adds member to the group
  invite(group, inviteMember) {
    if(inviteMember == undefined){
      alert("Member needs to be selected");
    } else {
      this.datasharingservice.groupInvite(inviteMember, group).subscribe(data => {
        if (!data) {
          alert('User already exists');
        } else {
          this.groups = data;
        }
      });
    }
  }
}
