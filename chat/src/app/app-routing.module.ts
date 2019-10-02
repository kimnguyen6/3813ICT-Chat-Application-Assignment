import { NgModule, Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { UsersComponent } from './users/users.component';
import { CreateGroupComponent } from './create-group/create-group.component';
import { GroupsComponent } from './groups/groups.component';
import { ChannelsComponent } from './channels/channels.component';
import { ChatComponent } from './chat/chat.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {path: 'login', component: LoginComponent},
  {path: 'profile', component: ProfileComponent},
  {path: "users", component: UsersComponent},
  {path: "groups", component: GroupsComponent},
  {path: "groups/create", component: CreateGroupComponent},
  {path: "groups/channels", component: ChannelsComponent},
  {path: "groups/channels/chat", component: ChatComponent},
  //{path: "chat-room/:group/:channel", component: ChatRoomComponent},
  {path: "groups/channels/createChannel", component: CreateChannelComponent},
  {path: "register", component: RegisterComponent}
];

@NgModule({
  imports: [CommonModule, RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
