const express = require("express"),
  jwt = require("jsonwebtoken"),
  bodyParser = require("body-parser"),
  app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.get("/", function (req, res) {
  res.send("Start");
});

app.post("/login", (req, res) => {
  if (req.body.user === "asfo" && req.body.password === "helloworld") {
    const payload = {
      check: true,
    };
    const token = jwt.sign(payload, app.get("key"), {
      expiresIn: 1440,
    });
    res.json({
      message: "Authentication successful",
      token: token,
    });
  } else {
    res.json({ message: "Invalid username or password" });
  }
});

const ProtectedPaths = express.Router();
ProtectedPaths.use((req, res, next) => {
  const token = req.headers["access-token"];
  if (token) {
    jwt.verify(token, app.get("key"), (err, decoded) => {
      if (err) {
        return res.json({ message: "Invalid token" });
      } else {
        req.decoded = decoded;
        next();
      }
    });
  } else {
    res.send({
      message: "Token not provided.",
    });
  }
});

app.get("/datos", ProtectedPaths, (req, res) => {
  const data = [
    { id: 1, name: "Asfo" },
    { id: 2, name: "Denisse" },
    { id: 3, name: "Carlos" },
  ];

  res.json(data);
});

module.exports = app;
// app.use(function (req, res, next) {
//   console.log("Time:", Date.now());
//   next();
// });
// // app.use("/user/:id", function (req, res, next) {
// //   console.log("Request Type:", req.method);
// //   res.send("USER");
// //   next();
// // });

// // app.get("/user/:id", function (req, res, next) {
// //   console.log("Request Type:");
// // });

// app.get(
//   "/user/:id",
//   function (req, res, next) {
//     // if the user ID is 0, skip to the next route
//     if (req.params.id === "0") next("route");
//     // otherwise pass the control to the next middleware function in this stack

//     else next();
//   },
//   function (req, res, next) {
//     // send a regular response
//     console.log("called next function");
//     res.send("regular");
//   }
// );

// // handler for the /user/:id path, which sends a special response
// app.get("/user/:id", function (req, res, next) {
//   console.log("called next route");
//   res.send("special");
// });
