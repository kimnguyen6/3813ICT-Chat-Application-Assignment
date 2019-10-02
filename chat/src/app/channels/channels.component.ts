import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { DataSharingService } from "../services/data-sharing.service";
import { Route, Router, Data } from "@angular/router";

@Component({
  selector: "app-channels",
  templateUrl: "./channels.component.html",
  styleUrls: ["./channels.component.css"]
})
export class ChannelsComponent implements OnInit {
  @Output() click = new EventEmitter();
  constructor(private router: Router, private dataservice: DataSharingService) {}

  profile;
  userChannels = [];
  selectUser;
  selectChannel;
  users;
  groupName;

  groupAssis;
  valid;

  ngOnInit() {
    this.click.emit();
    let groupName = sessionStorage.getItem("currentGroup");
    this.profile = JSON.parse(sessionStorage.getItem("user"));

    console.log(this.profile.type);
    this.groupName = groupName;

    this.groupAssis = sessionStorage.getItem("assis");

    this.dataservice.getChannels(this.groupName).subscribe(data => {
      this.users = data.members;

      this.userChannels = data.channels;
    });
  }
  // Changes the object to an array
  toArray(members: object) {
    return Object.keys(members).map(key => members[key]);
  }

  viewChat() {
    this.router.navigateByUrl("groups/channels/chat");
  }

  // Adds a member to a channel, after checking and receiving data
  addMember() {
    if (this.selectChannel == undefined) {
      alert("Choose a channel");
    } else if (this.selectUser == undefined) {
      alert("Choose a Member");
    } else {
      this.dataservice
        .channelInvite(this.groupName, this.selectChannel, this.selectUser)
        .subscribe(data => {
          if (!data) {
            alert("user already exstis");
          } else {
            this.userChannels = data;
          }
        });
    }
  }

  // Delete channel
  deleteChannel(channel) {
    this.dataservice.deleteChannel(this.groupName, channel).subscribe(data => {
      this.userChannels = data;
    });
  }

  //Delete a member from the channel
  deleteChannelMember(member, channel) {
    this.dataservice
      .deleteChannelMember(this.groupName, channel, member)
      .subscribe(data => {
        this.userChannels = data;
      });
  }
}
