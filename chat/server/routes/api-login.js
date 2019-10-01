module.exports = function(app, path){

    groups = [{
        group: "group1",
        assis: "user2",
        members: ["user1, user2, user3"]
    },
    {
        group: "group2",
        assis: "user3",
        members: ["user1, user3"] 
    }
    ];

    users = [
        {
            username: "user1",
            birthday: "19/09/1993",
            age: "26",
            email: "user1@com.au",
            password: "123",
            valid: "",
            type: "super"
        },
        {
            username: "user2",
            birthday: "12/03/1999",
            age: "20",
            email: "user2@com.au",
            password: "321",
            valid: "",
            type: "group assis"
        },
        {
            username: "user3",
            birthday: "18/09/1998",
            age: "21",
            email: "user3@com.au",
            password: "333",
            valid: "",
            type: "normal"
        },
        {
            username: "user4",
            birthday: "25/06/1996",
            age: "23",
            email: "user4@com.au",
            password: "444",
            valid: "",
            type: "group assis"
        }
    ];

    app.get("/groups", (req, res) => {
        res.send(groups);
    });

    app.get("/users", (req, res) => {
        res.send(users);
    });
    
    app.post("/api/register", (req, res) => {
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

        users.forEach(user => {
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

        users.push(freshUser);
        res.send(freshUser);
    });

    app.post("/group/create", (req, res) => {
        let valid = true;

        if (!req.body) {
            return res.sendStatus(400);
        }
        let newGroup = {};
        newGroup.group = req.body.group;
        newGroup.assis = req.body.selectedAssis;
        newGroup.members = req.body.members;
        console.log(req.body.members);

        groups.forEach(group => {
            if(group.group == newGroup.group){
                valid = false;
            }
        });

        if ((valid = false)) {
            res.send(false);
        } else {
            groups.push(newGroup);
            res.send(groups);
        }
    });

    app.post('/group/deleteMember', (req, res) => {
        if(!req.body){
            return res.sendStatus(400);
        }

        groups.forEach(group => {
            group.members.forEach((member, index) => {
                if (member == req.body.member) {
                    group.members.splice(index, 1);
                }
            });
        });
        res.send(groups);
    });

    app.post('/api/delete', function(req, res) {
        if (!req.body) {
            return res.sendStatus(400);
        }

        users.forEach((user, index) => {
            if (user.email == req.body.email) {
                users.splice(index, 1);
            }
        });
        res.send(users);
    })
    
    app.post('/api/auth', function(req, res) {
        if(!req.body){
            return res.sendStatus(400);
        }

        var consumer = {};

        users.forEach(user =>{
            if(req.body.email == user.email && req.body.password == user.password) {
                consumer.email = user.email;
                consumer.password = user.password;
                consumer.username = user.username;
                consumer.birthday = user.birthday;
                consumer.age = user.age;
                consumer.type = user.type
                consumer.valid = true;
            }
        });
        if (consumer.valid == true){
            res.send(consumer);
        } else {
            res.send(false);
        }
    });
};