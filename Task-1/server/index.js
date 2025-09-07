const dotenv = require("dotenv")
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const route = require("./routes/userRoutes.js")
const cors = require("cors")

const app = express();
app.use(bodyParser.json());
app.use(cors());
dotenv.config();

const PORT = process.env.PORT || 8000;
const MONGOURL = process.env.MONGO_UR || "mongodb://localhost:27017/";

mongoose
        .connect(MONGOURL)
        .then(()=>{
                console.log("DB connnected successfully.")
                app.listen(PORT,()=>{
                        console.log('Server is runnning on port :${PORT}')
                });
        })
        .catch((error) => console.log(error));

        app.use('/api', route);