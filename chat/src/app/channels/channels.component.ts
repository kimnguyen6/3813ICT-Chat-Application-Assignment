import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';
import { Route, Router, Data } from '@angular/router';

@Component({
  selector: "app-channels",
  templateUrl: "./channels.component.html",
  styleUrls: ["./channels.component.css"]
})
export class ChannelsComponent implements OnInit {
  @Output() click = new EventEmitter();

  constructor(private router: Router, private datasharingservice: DataSharingService) { }

  profile;
  userGroups;
  groups;
  userChannels;

  ngOnInit() {
    if (typeof Storage !== "undefined"){
      this.click.emit();
      let groupName = sessionStorage.getItem("currenGroup");
  
      this.datasharingservice.getUsers().subscribe(data => {
        data.forEach(data => {
          this.profile = JSON.parse(sessionStorage.getItem("user"));
          if (this.profile.username == data.username) {
            this.profile = data;
            this.userGroups = this.profile.groups;
            this.datasharingservice.getGroups().subscribe(data => {
              let groups = [];

              data.forEach((dat, index) => {
                this.userGroups.forEach(userGroup => {
                  if (userGroup == dat.group) {
                    groups.push(data[index]);
                  }
                });
              });

              if (this.profile.type == "super" ) {
                this.groups = data;
              } else {
                this.groups = groups;
              } 

              this.groups.forEach(group => {
                if (groupName == group.group) {
                  if (group.channels !== undefined ) {
                    this.userChannels = group.channels;
                    console.log(typeof this.userChannels[0].members);
                  }
                }
              });
            });
          }
        });
      });
    }
  }
  
  toArray(members: object){
    return Object.keys(members).map(key => members[key]);
  }
  viewChat(){
    this.router.navigateByUrl("groups/channels/chat");
  }

}
