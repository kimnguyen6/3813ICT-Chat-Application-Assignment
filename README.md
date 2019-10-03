# 3813ICT – Software Frameworks Documentation

# Chat Application
This repository contains the current progress of the chat application which is implemented using Node.js, Angular and Express. It would contain group administrations and channels. The use of MongoDB and Socket.io is also a small part of the project therefore there these concepts are partially implemented in the application.

# Functionality
This application holds the functionality of the following:
### Group Admin
* Create groups
* Create channels within groups
* Create/invite users to a channel
* Remove groups, channels and users from channels
* Can allow a user to become a Group Assis of the group

### Group Assis of a Group
* Can add or remove a user in the group from channels within the group
* Create channels within the group

### Super Admin
* Assign users with Group admin or Super admin roles
* Also has group admin privileges
* Can remove users from the chat application
* Also has a Group Admin role

### Users
* Identified by username
* One initial user called __Super__ who is a Super admin
* Has an email address

## Git Repository Layout
The root directory of the repository contains the `README.md` file for the specifications. Node.js implementation that is done in the file `server.js` which is found in the `chat` directory in another directory known as server. The root directory contains a sub-directory known as the `chat` directory which contains the components of Angular.

The `chat` directory contains all the auto-generated files. The project's files are contained inside the `src/app` sub-directory. There are also other directories relating to the specifications of the tasks including `login`, `groups`, `channels` etc.

Git is to be used in this project, whenever there has been an update where a new function is created and is working as intended an example would be the login form being responsive to the user's input in the `login` directory.

## Angular Architecture
The Angular application contains _components_, _services_ and _routes_.

#Components
These are the components that are in this project:
- Channels: displays channels inside the groups
- Chat: displays a chat system for the channels
- chat-room (not implemented)
- Groups: displays the groups that the specified user belongs to, includes a navigation to the channels
- create-group: A form is displayed, for the user to create a group with many options for the user to set up their group
- create-channel: A form is displayed asking for a channel name
- Login: A form for the user to submit in order to get authentication to the application
- Profile: Gets detail of the user that is logged in
- Register: A form allowing the Super user to create another user, sends data to server, allowing the server to add it the list
- Users: Displays a list of users that are in the website

As well as additional components that would be used for routing:
- Data-Sharing: used to create the functions, which makes the client and server communicate with one another. MongoDB was partially implemented in the project.
- Socket: used to have a connection with the socket.io service

## REST API
Are used to communicate with the node.js server using routes given through REST API:

* /api/auth (Post): used to check if the email as well as password that is entered is correct.
* /api/register (Post): used to create another user
* /api/delete (Post): used to delete the user from the server
* /groups (Get): get groups from the server by returning the data to the client side
* /group/deleteMember (Post): deletes members within the group
* /users (Get): sends user from the server to the client side
* /group/create (Post): creates a group, by having parameters given
* /channel/invite (Post): invites members in the group to join the channel
* /group/delete (Post): used to delete groups from the server
* /groups/group/invite (Post): invites another member to be in the group 
* /getChannels (Post): get channels in the group
* /createChannel (Post): create channels for the group
* /deleteChannel (Post): deletes channels from the group
* /channel/deleteMember (Post): deletes members in the channel

Data Structure
The type of data structure that is used in the project:
```javascript
{
“users”: [
{
            "username": "user4",
            "birthday": "25/06/1996",
            "age": "23",
            "email": "user4@com.au",
            "password": "444",
            "valid": "",
            "type": "group",
            "groups": ["group1,", "group3"]
        	}
]
```

```javascript
"groups": [
        		{
            	"group": "group1",
            	"assis": "user2",
            	"members": ["user1, user3, user4"]
        		}
]
```

## Test
Test were not implemented, but the testing that would’ve been used for the integration testing would range from either mocha, karma, jasmine etc.
