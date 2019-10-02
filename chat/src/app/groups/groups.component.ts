import { Component, OnInit } from '@angular/core';
import { DataSharingService } from '../services/data-sharing.service';
import { Route, Router, Data} from '@angular/router';

@Component({
  selector: 'app-groups',
  templateUrl: './groups.component.html',
  styleUrls: ['./groups.component.css']
})
export class GroupsComponent implements OnInit {
  
  groups;
  data;
  valid;
  userGroups;

  constructor(private router: Router, private datashringservice: DataSharingService) { }

  ngOnInit() {
    if(typeof Storage !== "undefined"){
      this.data = JSON.parse(sessionStorage.getItem("user"));
      this.userGroups = this.data.groups;
      
      if (this.data.type == "super" || this.data.type == "group"){
        this.valid = true;
      } else {
        this.valid = false;
      }
    }
    this.valid = false;

    this.datashringservice.getGroups().subscribe(data =>{
      let groups = [];

      data.forEach((dat, index) => {
        this.userGroups.forEach(userGroup => {
          if(userGroup == dat.group) {
            groups.push(data[index]);
          }
        });
      });

      if (this.data.type == "super" || this.data.type == "group") {
        this.groups = data;
      } else {
        this.groups = groups;
      }
    });
  }

  deleteGroup(group: string){
    this.datashringservice.deleteGroup(group).subscribe(data => {
      this.groups = data
    })
  }

  deleteMember(member: string){
    this.datashringservice.deleteMember(member).subscribe(data => {
      this.groups = data;
    });
  }

  toArray(members: object){
    return Object.keys(members).map(key => members[key]);
  }
}
