require("dotenv").config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 4000
const mongoose = require("mongoose");

// routing import here
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");

// middleware here
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());




// routes here calling 


app.use("/user",userRoute);
app.use("/blog",blogRoute);


// database connected here
mongoose.connect(process.env.MONGODB).then((res) => {
    console.log(`Database Connected`)
}).catch(err => console.log(err?.message))



// server start here

app.listen(PORT, () => console.log(`Your Server is Starting on ${PORT}`))