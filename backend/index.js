const express = require("express");
const dotenv = require("dotenv");
const http = require("http");
const { connectToMongoDb } = require("./db/ConnectMongoDB");
const cookieParser = require("cookie-parser");
const authRoutes  = require("./routes/auth.routes");
const todoRoutes  = require("./routes/todo.routes")


dotenv.config();

const app = express();
const port = process.env.PORT || 4000;

app.use(express.json()); // to parse incoming request in json payloads
app.use(cookieParser()); // to parse cookies

app.use("/api/auth", authRoutes)
app.use("/", todoRoutes)

app.listen(port, () => {
    connectToMongoDb();
    console.log(`server started at, ${port}`)
})

