import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';
import { Route, Router, Data } from '@angular/router';

@Component({
  selector: "app-create-channel",
  templateUrl: "./create-channel.component.html",
  styleUrls: ["./create-channel.component.css"]
})
export class CreateChannelComponent implements OnInit {

  channelName;
  group;

  constructor(private router: Router, private datasharingservice: DataSharingService) { }

  ngOnInit() {
    this.group = sessionStorage.getItem("currentGroup");
  }

  // Creates Channel
  createChannel(){
    console.log(this.channelName);
    if (this.channelName == undefined) {
      alert("Wrtie down the channel Name");
    } else {
      this.datasharingservice
        .createChannel(this.channelName, this.group)
        .subscribe(data => {
          if (!data) {
            alert("Channel names with same names cannot be created");
          } else {
            this.router.navigateByUrl("groups/channels");
          }
        });
    }
  }
}
