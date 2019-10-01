module.exports = function(app, path){
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
            type: "group"
        },
        {
            username: "user3",
            birthday: "18/09/1998",
            age: "21",
            email: "user3@com.au",
            password: "333",
            valid: "",
            type: "normal"
        }
    ];

    app.get("/users", (req, res) => {
        res.send(users);
    });
    
    app.post("/api/register", (req, res) => {
        if (!req.body) {
            return res.sendStatus(400);
        }
        let freshUser = {};

        freshUser.valid = false;
        freshUser.email = req.body.email;
        freshUser.password = req.body.password;
        freshUser.birthday = req.body.birthday;
        freshUser.username = req.body.username;
        freshUser.age = req.body.age;
        freshUser.type = "normal";

        users.push(freshUser);
        res.send(freshUser);
    });

    app.post('/api/auth', function(req, res) {
        if(!req.body){
            return res.sendStatus(400);
        }

        var consumer = {};

        consumer.email = "";
        consumer.username = "";
        consumer.birthday = "";
        consumer.password = "";
        consumer.age = 0;
        consumer.valid = false;
        consumer.type = "";

        for (let x = 0; x < users.length; x++){
            if (
                req.body.email == users[x].email &&
                req.body.password == users[x].password
            ) {
                consumer.valid = true;
                consumer.email = users[x].email;
                consumer.password = users[x].password;
                consumer.birthday = users[x].birthday;
                consumer.username = users[x].username;
                consumer.age = users[x].age;
                consumer.type = users[x].type;
                res.send(consumer);
            } else {
                // res.send(check)
            }
        }
    });
};