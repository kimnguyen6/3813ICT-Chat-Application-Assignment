import { Injectable, Component, EventEmitter } from '@angular/core';
import { Observable } from 'rxjs';
import { HttpClient } from '@angular/common/http';

interface User {
  email: string;
  username: string;
  birthday: string;
  age: number;
  valid: boolean;
  type: string;
}

@Injectable({
  providedIn: 'root'
})
export class DataSharingService {
  $groupName = new EventEmitter();

  backend = "http://localhost:3000";

  constructor(private http: HttpClient) { }

  imgUpload(fd) {
    return this.http.post<any>(this.backend + '/api/upload', fd)
  }

  //Sends Group name to channel component
  sendGroupName(group){
    this.$groupName.emit(group);
  }

  // Gets the Group from the server
  getGroups() {
    return this.http.get<any>(this.backend + "/groups");
  }

  // Authentication for logging in
  logIn(email: string, password: string) {
    return this.http.post<User>(this.backend + "/api/auth", {
      email: email,
      password: password
    });
  }

  // Gets the user
  getUsers() {
    return this.http.get<any>(this.backend + "/users");
  }

  // deletes the user
  deleteUser(email: string) {
    return this.http.post<any>(this.backend + "/api/delete", {
      email: email
    });
  }

  // create groups
  createGroup(group: any, members, selectedAssis: any, groupAdmin: string) {
    return this.http.post<any>(this.backend + "/group/create", {
      group: group,
      members: members,
      selectedAssis: selectedAssis,
      groupAdmin: groupAdmin
    });
  }

  // invites other members to group
  groupInvite(member: string, group: string) {
    return this.http.post<any>(this.backend + "/groups/group/invite", {
      member: member,
      group: group
    });
  }

  // deletes group
  deleteGroup(group: string) {
    return this.http.post<any>(this.backend + "/group/delete", {
      group: group
    });
  }

  //remove members from group
  deleteMember(member: string, group) {
    return this.http.post<any>(this.backend + "/group/deleteMember", {
      member: member,
      group: group
    });
  }

  // create channels within the group
  createChannel(channel: string, group: string) {
    return this.http.post<any>(this.backend + "/createChannel", {
      channel: channel,
      group: group
    });
  }

  // deletes channels in the group
  deleteChannel(group: string, channel: string) {
    return this.http.post<any>(this.backend + "/deleteChannel", {
      channel: channel,
      group: group
    });
  }

  // invites members into the channel
  channelInvite(groupName, channel, member) {
    return this.http.post<any>(this.backend + "/channel/invite", {
      group: groupName,
      channel: channel,
      member: member
    });
  }

  // creating a new user
  register(email: string, password: string, username: string, birthday: Date, type: string, imageName: string){
    return this.http.post<any>(this.backend + "/api/register", {
      email: email,
      password: password,
      username: username,
      birthday: birthday,
      type: type,
      imageName: imageName
    });
  }

  // remove a member from the channel
  deleteChannelMember(group: string, channel: string, member: string) {
    return this.http.post<any>(this.backend + "/channel/deleteMember", {
      group: group,
      channel: channel,
      member: member
    });
  }

  // gets channel
  getChannels(group: string) {
    return this.http.post<any>(this.backend + "/getChannels", {
      group: group
    });
  }

  // Gives Super Admin to user
  giveSuper(user) {
    return this.http.post<any>(this.backend + "/giveSuper", {
      user: user
    });
  }
}
