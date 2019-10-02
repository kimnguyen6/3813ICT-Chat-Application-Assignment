import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { ProfileComponent } from './profile/profile.component';
import { ChannelsComponent } from './channels/channels.component';
import { GroupsComponent } from './groups/groups.component';
import { UsersComponent } from './users/users.component';
import { RegisterComponent } from './register/register.component';
import { CreateChannelComponent } from './create-channel/create-channel.component';
import { ChatComponent } from './chat/chat.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { DataSharingService } from './services/data-sharing.service';
import { SocketService } from './services/socket.service';
import { CreateGroupComponent } from './create-group/create-group.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    ProfileComponent,
    ChannelsComponent,
    GroupsComponent,
    UsersComponent,
    RegisterComponent,
    CreateChannelComponent,
    ChatComponent,
    //ChatRoomComponent,
    CreateGroupComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule
  ],
  providers: [DataSharingService, SocketService],
  bootstrap: [AppComponent]
})
export class AppModule { }
