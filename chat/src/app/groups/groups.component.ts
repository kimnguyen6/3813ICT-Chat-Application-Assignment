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
  valid: Boolean = false;

  constructor(private router: Router, private datashringservice: DataSharingService) { }

  ngOnInit() {
    if(typeof Storage !== "undefined"){
      this.data = JSON.parse(sessionStorage.getItem("user"));
      console.log(this.data.type);
      if (this.data.type == "super" || this.data.type == "group"){
        this.valid = true;
      } else {
        this.valid = false;
      }
      console.log(this.valid);
    }

    this.datashringservice.getGroups().subscribe(data => {
      this.groups = data;
    })
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
