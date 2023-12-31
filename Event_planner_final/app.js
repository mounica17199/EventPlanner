const express = require("express");
const app = express();
const mongoose = require("mongoose");
const db = require("./config/keys").mongoURI;
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");

const users = require("./routes/api/users");
const events = require("./routes/api/events");
const threads = require("./routes/api/threads");

if (process.env.NODE_ENV === "production") {
  app.use(express.static("frontend/build"));
  app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  })
}

mongoose
  .connect(db, { useNewUrlParser: true })
  .then(() => console.log("Connected to MongoDB successfully"))
  .catch(err => console.log(err));

app.use(passport.initialize());
require("./config/passport")(passport);


// tells app to respond to other apps like postman
app.use(bodyParser.urlencoded({ extended: false }));
// tells our app to respond to JSON requests 
app.use(bodyParser.json());

app.use("/api/users", users);
app.use("/api/events", events);
app.use("/api/threads", threads);
  
const port = process.env.PORT || 8080;
// app.listen(port, () => console.log(`Server is running on port ${port}`) , (err) => console.log(err));
app.listen(port, () => console.log(`Server is running on port ${port}`));