const express = require("express");
const app = express();

import "./apis/theGraph";
  
app.post("/post", (req, res) => {
  console.log("Connected to React");
});
  
const PORT = process.env.PORT || 8080;
  
app.listen(PORT, console.log(`Server started on port ${PORT}`));