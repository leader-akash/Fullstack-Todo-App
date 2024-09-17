const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors")
const http = require("http");
const { connectToMongoDb } = require("./db/ConnectMongoDB");
const cookieParser = require("cookie-parser");
const authRoutes  = require("./routes/auth.routes");
const todoRoutes  = require("./routes/todo.routes")


dotenv.config();

const app = express();

app.use(cors());

const port = process.env.PORT || 4000;

app.use(express.json()); // to parse incoming request in json payloads
app.use(cookieParser()); // to parse cookies

app.use("/api/auth", authRoutes)
app.use("/", todoRoutes)

app.get('/hello', (req, res) => {
    res.send('Hello World')
  })

  app.get('/about', (req, res) => {
    res.send('About route 🎉 ')
  })
  

app.listen(port, () => {
    connectToMongoDb();
    console.log(`server started at, ${port}`)
})

