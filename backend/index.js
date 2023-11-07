require("dotenv").config()
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const PORT = process.env.PORT || 4000
const mongoose = require("mongoose");
const morgan = require("morgan");

// routing import here
const userRoute = require("./routes/userRoute");
const blogRoute = require("./routes/blogRoute");
const brandRoute = require("./routes/brandRoute");
const colorRoute = require("./routes/colorRoute");
const productCategory = require("./routes/categoryRoute");
const product = require("./routes/productRoute");

// middleware here
app.use(express.json())
app.use(bodyParser.json());
app.use(cors());
app.use(morgan("dev"));



// routes here calling 


app.use("/user", userRoute);
app.use("/blog", blogRoute);
app.use("/brand", brandRoute);
app.use("/color", colorRoute);
app.use("/category",productCategory);
app.use("/product",product);


// database connected here
mongoose.connect(process.env.MONGODB).then((res) => {
    console.log(`Database Connected`)
}).catch(err => console.log(err?.message))



// server start here

app.listen(PORT, () => console.log(`Your Server is Starting on ${PORT}`))