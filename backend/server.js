/* eslint-disable no-loop-func */
const express = require('express')
const app = express()
const port = 3001
var DBPool = require('./database');
var session = require('express-session');
var bodyParser = require('body-parser');

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: true,
    saveUninitialized: true
}));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

//controllers



//routing


//Login/Session management  

/*
* POST the users SHA512 HASHED password and email to this server.
* Search all users in the database for these credentials
* If a match is found. Update session variable with their username.
* Else return false and handle the rest on the client side.
*/

app.post('/api/login/:email/:password', async function (request, response) {
    var email = request.params.email;
    var password = request.params.password; //get the parameters from the request.
    const [results, fields] = await DBPool.query('SELECT * FROM user WHERE Email = ? AND Password = ?', [email, password]);   //query the database for the user.
    if (results.length > 0) {
        request.session.loggedin = true;    //update session variable with the user's details .
        request.session.username = email;
        request.session.userID = results[0].UserID;
        response.send(true);
    }
    else {
        response.send(false);
    }
    response.end();
});



/*
* The req.session variable contains information about the logged in user
* Therefore if it contains a value, someone is logged in.
* If it does not contain any values (null/false) then the user is not logged in.
*/

app.get('/api/checkuser', function (req, res) {
    if (req.session.loggedin === true && req.session.username !== null) {
        res.send(req.session);
    }
    else {
        res.send(false);
    }
});


/*
* Resets the contents of the session variable to indicate the user is not logged in.
*/
app.get('/api/logout', function (req, res) {
    req.session.loggedin = false;
    req.session.username = null;
    res.sendStatus(200);
}
); 

app.listen(port, async () => {
    console.log(`Listening on port: ${port}`)
})

module.exports.app = app;