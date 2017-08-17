var jwt = require('jwt-simple');

var auth = {

  login: function(req, res) {

   console.log("username"+req.query.username);
    //console.log("Login"+req.query.password);
  // console.dir(req);
    //var username = req.body.username || '';
    //var password = req.body.password || '';

    var username = req.query.username || '';
    var password = req.query.password || '';

    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

    // Fire a query to your DB and check if the credentials are valid
    var dbUserObj = auth.validate(username, password);

    if (!dbUserObj) { // If authentication fails, we send a 401 back
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

    if (dbUserObj) {

      // If authentication is success, we will generate a token
      // and dispatch it to the client

      res.json(genToken(dbUserObj));
    }

  },

  validate: function(username, password) {
    // spoofing the DB response for simplicity
    /*var dbUserObj = { // spoofing a userobject from the DB.
      name: 'robekson',
      role: 'admin',
      username: 'robekson@gmail.com'
    };*/

     var dbUserObj;

     if (username == 'robekson@gmail.com' && password == 'pass123' ){
        dbUserObj = { // spoofing a userobject from the DB.
              name: 'robekson',
              role: 'admin',
              username: 'robekson@gmail.com'
         };
     }

    return dbUserObj;
  },

  validateUser: function(username) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB.
      name: 'robekson',
      role: 'admin',
      username: 'robekson@gmail.com'
    };

    return dbUserObj;
  },
}

// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());

  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}

module.exports = auth;