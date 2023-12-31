const express = require("express");
const path = require("path");
const bodyParser = require("body-parser");
require("../src/db/Mongoose/mongoose");
const cors = require("cors");


const app = express();
app.use(
  cors({   
    origin: process.env.CORS_ORIGIN,
    credentials: true,
  })
); 

app.use(bodyParser.json());

const AuthRouter = require('../Route/Auth') 
const AdminRouter = require('../Route/Admin')
const UserRouter = require('../Route/User')
const CartRouter = require('../Route/Cart')
const OrderRouter = require('../Route/Order')

app.use("/image", express.static(path.join(__dirname, "../Public")));

app.use('/',AuthRouter)
app.use('/Admin',AdminRouter)
app.use('/User',UserRouter)
app.use('/Cart',CartRouter)
app.use('/Order',OrderRouter)

app.listen(5000, () => {
  console.log("Server started on port 5000");
});

module.exports = app;