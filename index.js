const dotenv = require("dotenv");
dotenv.config({ path: "./config.env" });
const express = require('express');
const fileUpload = require('express-fileupload');
const cors = require("cors");
const dbConnection = require("./utils/dbConnection");
const app = express();

// Enable Middleware
app.use(express.json());
app.use(cors({ origin: "*", optionsSuccessStatus: 200 }));
app.use(fileUpload());

app.use("/api", require("./routes/userRoutes"));


app.get("/", (req, res) => {
  res.send("Hello, LBMS Server is Live")
})

// Start the server
// app.listen(process.env.PORT || 3000, () => {
//   console.log(`Server listening on port ${process.env.PORT}`);
// });


// Database Connection and Server Start
dbConnection()
  .then((status) => {
    console.log(status);
    app.listen(process.env.PORT || 3000, () => {
      console.log(
        `App listening at http://localhost:${process.env.PORT || 3000}`
      );
    });
  })
  .catch((err) => console.log(err));