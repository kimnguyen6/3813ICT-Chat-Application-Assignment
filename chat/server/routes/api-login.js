module.exports = function(db, app, path, ObjectID){
    var fs = require('fs');

    const userCollection = db.collection("users");
    console.log(userCollection);
    const groupsCollection = db.collection("groups");
    console.log(groupsCollection);

    var users = {
      username: "user1",
      birthday: "19/09/1993",
      email: "user1@com.au",
      password: "123",
      valid: "",
      type: "super",
      groups:["group1,","group2","group3"]
    };

    userCollection.find({ email: "user1@com.au" }).count((err, count) => {
      if (count == 0) {
        userCollection.insertOne(users, (err, dbres) =>{
          if (err) throw err;
          console.log(userCollection)
        });
      }
    });

    //  image upload
    app.post('/api/upload', (req, res) => {
      var form = new formidable.IncomingForm({ uploadDir: './userImages' })
      form.keepExtenstions = true;
      
      form.on('fileBegin', (name, file) => {
        file.path = form.uploadDir + "/" + file.name;
      })
      form.parse(req);
    })

    // Gets Specific Group Information
    app.post("/getChannels", (req, res) => {
        let data = fs.readFileSync("data.json", "utf8", function(err, data){
            if(err) {
                console.log(err);
            } else {
                return data;
            }
        });

        data = JSON.parse(data);

        if (!req.body){
            return res.sendStatus(400);
        }

        let groupIndex = data.groups.map(group => {
            return group.group;
        })
        .indexOf(req.body.group);
        res.send(data.groups[groupIndex]);
    });

    //Gets the Groups
    app.get("/groups", (req, res) => {
        let data = fs.readFileSync("data.json", "utf8", function(err, data){
            if (err) {
                console.log(err);
            }
        });
        data = JSON.parse(data);

        res.send(data.groups);
    });

    // Gets the Users
    app.get("/users", (req, res) => {
        let data = fs.readFileSync("data.json", "utf8", function(err, data){
            if (err) {
                console.log(err);
            }
        });
        data = JSON.parse(data);
        res.send(data.users);
    });
    
    // Creating New Users
    app.post("/api/register", (req, res) => {
        let data = fs.readFileSync("data.json", "utf8", function(err, data){
            if (err) {
                console.log(err);
            }
        });
        data = JSON.parse(data);

        if (!req.body) {
            return res.sendStatus(400);
        }
        let freshUser = {};

        freshUser.email = req.body.email;
        freshUser.password = req.body.password;
        freshUser.birthday = req.body.birthday;
        freshUser.username = req.body.username;
        freshUser.type = req.body.type;
        freshUser.imageName = req.body.imageName;
        freshUser.valid = "";
        freshUser.groups = [];

        data.users.forEach(user => {
            if(user.email == freshUser.email && user.username == freshUser.username){
                freshUser.valid = "bothFalse";
                return;
            } else if (user.email == freshUser.email){
                freshUser.valid = "emailFalse";
                return;
            } else if (user.username == freshUser.username){
                freshUser.valid = "usernameFalse";
                return;
            }
        });

        if(freshUser.valid == ""){
            data.users.push(freshUser);
            data = JSON.stringify(data);
            fs.writeFile("data.json", data, function(err, result){
                if (err) console.log("errpot", err)
            });
        }
        res.send(freshUser);
    });

    // Creating a New Group
    app.post("/group/create", (req, res) => {
        let data = fs.readFileSync("data.json", "utf8", function(err, data){
            if(err){
                console.log(err)
            } else {
                return data;
            }
        });
        data = JSON.parse(data);

        let valid = true;

        if (!req.body) {
            return res.sendStatus(400);
        }
        let newGroup = {};
        newGroup.group = req.body.group;
        newGroup.assis = req.body.selectedAssis;
        newGroup.members = req.body.members;
        newGroup.groupAdmin = req.body.groupAdmin;

        req.body.members.forEach(group => {
            data.users.forEach(member => {
                if(member == user.username) {
                    user.groups.push(req.body.group);
                }
            });
        });

        data.groups.forEach(group =>{
            if(group.group == newGroup.group){
                valid = false;
            }
        });

        if (!valid) {
            res.send(false);
        } else {
            data.groups.push(newGroup);
            res.send(data.groups);
            data = JSON.stringify(data);

            fs.writeFile("data.json", data, function(err, result){
                if (err) console.log("error", err);
            });
        }
    });

    // Creating Channels in a Group
    app.post('/createChannel', (req, res) => {
        let data = fs.readFileSync("data.json", "utf8", function (err, data){
            if (err) {
                console.log(err);
            } else {
                return data;
            }
        });

        data = JSON.parse(data);

        let groupIndex = data.groups.map(group => {
            return group.group;
        })
        .indexOf(req.body.group);
        console.log(req.body.channel);
        console.log(req.body.group);

        let newChannel = {};

        newChannel.channel = req.body.channel;
        newChannel.members = [];
        if (data.groups[groupIndex].channels == undefined) {
            data.groups[groupIndex].channels = [];
        }

        let channelName = data.groups[groupIndex].channels.map(channel => {
            return channel.channel;
        })
        .indexOf(req.body.channel);

        if (channelName == -1) {
            data.groups[groupIndex].channels.push(newChannel);
            res.send(true);
        } else {
            res.send(false);
        }

        data = JSON.stringify(data);
        fs.writeFile("data.json", data, function(err, result) {
            if (err) console.log("error", err);
        });
    });

    // Delete Channel
    app.post("/deleteChannel", (req, res) => {
        let data = fs.readFileSync("data.json", "utf8", function(err, data){
            if (err) {
                console.log(err);
            } else {
                return data;
            }
        });
        data = JSON.parse(data);

        if(!req.body){
            return res.sendStatus(400);
        }

        console.log(req.body.channel, req.body.group);

        let groupIndex = data.groups.map(group => {
            return group.group;
        })
        .indexOf(req.body.group);
        console.log(data.groups[groupIndex].channels);
        let channelIndex = data.groups[groupIndex].channels.map(channel => {
            return channel.channel;
        })
        .indexOf(req.body.channel);

        data.groups[groupIndex].channels.splice(channelIndex, 1);

        res.send(data.groups[groupIndex].channels);

        data = JSON.stringify(data);
        fs.writeFile("data.json", data, function(err, result){
            if (err) console.log("error", err);
        });
    });

    //Allows super admin to be given
   app.post("/giveSuper", (req, res) => {
    let data = fs.readFileSync("data.json", "utf8", function(err, data) {
      if (err) {
        console.log(err);
      } else {
        return data;
      }
    });

    data = JSON.parse(data);

    if (!req.body) {
      return res.sendStatus(400);
    }
    let userIndex = data.users
      .map(user => {
        return user.username;
      })
      .indexOf(req.body.user.username);

    data.users[userIndex].type = "super";
    res.send(data.users);
    data = JSON.stringify(data);
    fs.writeFile("data.json", data, function(err, result) {
      if (err) console.log("error", err);
    });
  });

    // Delete members in the channel
    app.post("/group/deleteMember", (req, res) => {
      let data = fs.readFileSync("data.json", "utf8", function(err, data) {
        if (err) {
          console.log(err);
        } else {
          return data;
        }
      });
 
      data = JSON.parse(data);
 
      if (!req.body) {
        return res.sendStatus(400);
      }
      console.log(req.body.group, req.body.member);
 
      var group_index = data.groups
        .map(group => {
          return group.group;
        })
        .indexOf(req.body.group);
 
      var member_index = data.groups[group_index].members.indexOf(
        req.body.member
      );
 
      console.log(member_index);
 
      data.groups[group_index].members.splice(member_index, 1);
 
      res.send(data.groups);
       data = JSON.stringify(data);
      fs.writeFile("data.json", data, function(err, result) {
        if (err) console.log("error", err);
      });
    });

    // Add members to the channel
    app.post("/channel/invite", (req, res) => {
     let data = fs.readFileSync("data.json", "utf8", function(err, data) {
       if (err) {
         console.log(err);
       } else {
         return data;
       }
     });
     data = JSON.parse(data);

     if (!req.body) {
       return res.sendStatus(400);
     }

     console.log(req.body.channel, req.body.member, req.body.group);

     let groupIndex = data.groups
       .map(group => {
         return group.group;
       })
       .indexOf(req.body.group);

     let channelIndex = data.groups[groupIndex].channels
       .map(channel => {
         return channel.channel;
       })
       .indexOf(req.body.channel);

     let check = data.groups[groupIndex].channels[channelIndex].members.includes(
       req.body.member
     );
     if (!check) {
       data.groups[groupIndex].channels[channelIndex].members.push(
         req.body.member
       );
       res.send(data.groups[groupIndex].channels);
     } else {
       res.send(false);
     }

     let userIndex = data.users
       .map(user => {
         console.log(user);
         return user.username;
       })
       .indexOf(req.body.member);

     if (data.users[userIndex].channels == undefined) {
       data.users[userIndex].channels = [];
     }
     let userChannelIndex = data.users[userIndex].channels
       .map(channel => {
         return channel.group;
       })
       .indexOf(req.body.group);

     if (userChannelIndex == -1) {
       let newChannel = {};
       newChannel.group = req.body.group;
       newChannel.groupChannels = [];
       newChannel.groupChannels.push(req.body.channel);
       data.users[userIndex].channels.push(newChannel);
     } else {
       let newChannel = {};
       newChannel.group = req.body.group;
       newChannel.groupChannels = [];
       newChannel.groupChannels.push(req.body.channel);
       data.users[userIndex].channels.push(newChannel);
     }

     data = JSON.stringify(data);
     fs.writeFile("data.json", data, function(err, result) {
       if (err) console.log("error", err);
     });
   });

    // Deletes Users
    app.post('/api/delete', function(req, res) {
        let data = fs.readFileSync("data.json", "utf8", function(err, data){
            if (err) {
                console.log(err);
            } else {
                return data;
            }
        });
        data = JSON.parse(data);

        if (!req.body) {
            return res.sendStatus(400);
        }

        data.users.forEach((user, index) => {
            if (user.email == req.body.email) {
                data.users.splice(index, 1);
                res.send(data.users);
                data = JSON.stringify(data);

                fs.writeFile("data.json", data, function(err, result){
                    if (err) console.log("error", err);
                });
            }
        });
    })

    // Deletes Groups
    app.post("group/delete", function(req, res) {
        let data = fs.readFileSync("data.json", "utf8", function(err, data) {
            if (err) {
              console.log(err);
            } else {
              return data;
            }
        });
        data = JSON.parse(data);

        if(!req.body) {
            return res.sendStatus(400);
        }

        data.groups.forEach((group, index) => {
            if(group.group == req.body.group){
                data.groups.splice(index, 1);

                data.users.forEach(user => {
                    user.groups.forEach((userGroup, index) => {
                        if (group.group == userGroup) {
                            user.groups.splice(index, 1);
                        }
                    });
                });
                res.send(data);

                data = JSON.stringify(data);

                fs.writeFile("data.json", data, function(err, result){
                    if (err) console.log("error", err);
                })
            }
        });
    });

    // Adds Group Members
    app.post("/groups/group/invite", (req, res) => {
     let data = fs.readFileSync("data.json", "utf8", function(err, data) {
       if (err) {
         console.log(err);
       } else {
         return data;
       }
     });
     data = JSON.parse(data);

     if (!req.body) {
       return res.sendStatus(400);
     }
     var group_index = data.groups
       .map(group => {
         return group.group;
       })
       .indexOf(req.body.group);

     if (data.groups[group_index].members.includes(req.body.member)) {
       res.send(false);
     } else {
       data.groups[group_index].members.push(req.body.member);
       console.log(data.groups[group_index].members);
       res.send(data.groups);
     }
     data = JSON.stringify(data);

     fs.writeFile("data.json", data, function(err, result) {
       if (err) console.log("error", err);
     });
   });

   // Authentication
    app.post('/api/auth', function(req, res) {
        let data = fs.readFileSync("data.json", "utf8", function(err, data){
            if (err) {
                console.log(err);
            } else {
                return data;
            }
        });

        if(!req.body){
            return res.sendStatus(400);
        }

        var consumer = {};

        data = JSON.parse(data);
        data.users.forEach(user =>{
            if(req.body.email == user.email && req.body.password == user.password) {
                consumer.email = user.email;
                consumer.password = user.password;
                consumer.username = user.username;
                consumer.birthday = user.birthday;
                consumer.age = user.age;
                consumer.type = user.type
                consumer.valid = true;
                consumer.groups = user.groups;
            }
        });
        if (consumer.valid == true){
            res.send(consumer);
        } else {
            res.send(false);
        }
    });
};