const dotenv = require("dotenv")
const express = require('express')
const mongoose = require('mongoose')
const bodyParser = require("body-parser")
const route = require("./routes/userRoutes.js")

// import express from "express"
// import mongoose from "mongoose"
// import bodyParser from "body-parser"
// import dotenv from "dotenv"
// import route from "./routes/userRoutes.js"

const app = express();
app.use(bodyParser.json());
dotenv.config();

const PORT = process.env.PORT || 7000;
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