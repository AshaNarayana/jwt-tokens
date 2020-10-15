const express = require("express"),
  app = express();
require("dotenv").config();
app.set("key", process.env.JWT_KEY);
app.use("/", require("./routes/routes"));
app.listen(5000, () => {
  console.log("listening on port 5000");
});
