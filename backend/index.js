const express = require("express");
const cors = require("cors");

require("dotenv").config();
require("./config/connect");

const port = process.env.port;
const app = express();

const userRoute = require("./routes/userRoutes");

app.use(express.json());
app.use(cors());
app.use("/api/user", userRoute);

app.get("/", (req, res)=>{
    res.send("Application is running ")
})

app.listen(port, ()=>console.log("Application is running on port : ", port)
)