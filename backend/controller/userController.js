const userService = require("../service/userService");
const bcrypt = require("bcrypt");
const session = require("express-session");
const { v4: uuidv4 } = require("uuid");

const registerUser = (req, res) => {
  let user = userService.getUser(req.body.username);
  user.then((data) => {
    if (data.length > 0) {
      res.status(500);
      res.send("Username already exist in system");
    } else {
      let result = userService.addUser(req.body);
      result.then(
        (data) => {
          res.status(200);
          res.send(`${data.insertId}`);
        },
        (err) => {
          res.status(500);
          res.send("Failed to register " + err.message);
        }
      );
    }
  });
};

const authenticate = (req, res) => {
  if (req.session && req.session.id) {
    if (req.session.id == req.body.id) {
      res.status(200);
      res.send("Session Valid");
    } else {
      res.status(401);
      res.send("Invalid Session");
    }
  }
};

const login = (req, res) => {
  let result = userService.getUser(req.body.username);
  let user;
  let roles;

  result.then((data) => {
    if (data.length == 0) {
      res.status(401);
      res.send("user not found");
    } else {
      if (bcrypt.compareSync(req.body.password, data[0].password)) {
        req.session.username = data[0].username;
        delete data[0].password;
        req.session.user = new uuidv4();
        req.session.username = req.body.username;
        req.session.id = new uuidv4();
        res.status(200);
        res.send({ id: req.session.id });
      } else {
        res.send("Ivalid Password");
      }
    }
  });
};

const verifyRoles = (req, res) => {
  if (req.body.role) {
    let result = userService.getUserRoles(req.session.username);
    result.then(
      (data) => {
        for (var i = 0; i < data.length; i++) {
          for (var j = 0; j < req.body.role.length; j++) {
            if (data[i].role_id == req.body.role[j]) {
              res.status(200);
              res.send("Authorized");
            }
          }
        }
      },
      (err) => {
        res.status(401);
        res.send("user unauthorized");
      }
    );
  }
};

const logout = (req, res) => {
  if (req.session) {
    req.session.destroy((err) => {
      if (err) {
        res.status(400).send("Unable to log out");
      } else {
        res.send("Logout successful");
      }
    });
  } else {
    res.end();
  }
};

module.exports = {
  registerUser,
  login,
  authenticate,
  logout,
  verifyRoles,
};
