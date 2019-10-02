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
  userChannels;
  selectUser;
  selectChannel;
  groupName;

  ngOnInit() {
    this.click.emit();
    let groupName = sessionStorage.getItem("currentGroup");
    this.profile = JSON.parse(sessionStorage.getItem("user"));

    this.groupName = groupName;

    this.dataservice.getChannels(this.groupName).subscribe(data => {
      this.userChannels = data.channels;
      console.log(this.userChannels);
    });
  }
  toArray(members: object) {
    return Object.keys(members).map(key => members[key]);
  }
  viewChat() {
    this.router.navigateByUrl("groups/channels/chat");
  }

  addMember() {
    if (this.selectChannel == undefined) {
      alert("Choose the channel");
    } else if (this.selectUser == undefined) {
      alert("choose the member");
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
  deleteChannel(channel) {
    this.dataservice.deleteChannel(this.groupName, channel).subscribe(data => {
      this.userChannels = data;
    });
  }

  deleteChannelMember(member, channel) {
    this.dataservice
      .deleteChannelMember(this.groupName, channel, member)
      .subscribe(data => {
        this.userChannels = data;
      });
  }
}
