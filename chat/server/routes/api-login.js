module.exports = function(app, path){
    var fs = require('fs');
    // groups = [{
    //     group: "group1",
    //     assis: "user2",
    //     members: ["user1, user3, user4"]
    // },
    // {
    //     group: "group2",
    //     assis: "user3",
    //     members: ["user1, user2"] 
    // },
    // {
    //     group: "group3",
    //     assis: "user3",
    //     members: ["user1, user4"] 
    // }
    // ];

    // users = [
    //     {
    //         username: "user1",
    //         birthday: "19/09/1993",
    //         age: "26",
    //         email: "user1@com.au",
    //         password: "123",
    //         valid: "",
    //         type: "super",
    //         groups: ["group1,", "group2", "group3"]
    //     },
    //     {
    //         username: "user2",
    //         birthday: "12/03/1999",
    //         age: "20",
    //         email: "user2@com.au",
    //         password: "321",
    //         valid: "",
    //         type: "group assis",
    //         groups: ["group1,", "group2"]
    //     },
    //     {
    //         username: "user3",
    //         birthday: "18/09/1998",
    //         age: "21",
    //         email: "user3@com.au",
    //         password: "333",
    //         valid: "",
    //         type: "normal",
    //         groups: ["group1,", "group2", "group3"]
    //     },
    //     {
    //         username: "user4",
    //         birthday: "25/06/1996",
    //         age: "23",
    //         email: "user4@com.au",
    //         password: "444",
    //         valid: "",
    //         type: "group",
    //         groups: ["group1,", "group3"]
    //     }
    // ];

    app.get("/groups", (req, res) => {
        let data = fs.readFileSync("data.json", "utf8", function(err, data){
            if (err) {
                console.log(err);
            }
        });
        data = JSON.parse(data);
        res.send(data.groups);
    });

    app.get("/users", (req, res) => {
        let data = fs.readFileSync("data.json", "utf8", function(err, data){
            if (err) {
                console.log(err);
            }
        });
        data = JSON.parse(data);
        res.send(data.users);
    });
    
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
        freshUser.age = req.body.age;
        freshUser.type = "normal";
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

    app.post("/group/create", (req, res) => {
        let data = fs.readFileSync("data.json", "utf8", function(err, data){
            if(err){
                console.log(err)
            } else {
                return data;
            }
        });
        data = JSON.parse(data);
        console.log(data);

        let valid = true;

        if (!req.body) {
            return res.sendStatus(400);
        }
        let newGroup = {};
        newGroup.group = req.body.group;
        newGroup.assis = req.body.selectedAssis;
        newGroup.members = req.body.members;

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

    app.post('/group/deleteMember', (req, res) => {
        let data = fs.readFileSync("data.json", "utf8", function (err, data){
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

        data.groups.forEach(group =>{
            group.members.forEach((member, index) => {
                if (member == req.body.member){
                    group.members.splice(index, 1);
                    res.send(data.groups);

                    data = JSON.stringify(data);
                    fs.writeFile("data.json", data, function (err, result){
                        if (err) console.log("error", err);
                    });
                }
            });
        });
    });

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