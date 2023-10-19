require("dotenv").config();
const express = require("express")
const app = express();
const path = require("path")
const hbs = require("hbs")
const port=process.env.PORT;
const jwt=require("jsonwebtoken")
require("./db/connect.js")
const indexxRouter = require("./router/Index")
const LoginRouter = require("./router/loginRouter")
const dashboardRouter = require("./router/dashboard_router")
const RegistrationRouter = require("./router/registration_router")
const cookieParser=require("cookie-parser")
            
// mongodb use
// const MongoClient = require("mongodb").MongoClient
// const connectionString = "mongodb://127.0.0.1:27017/"

// mongoose require
require("./db/connect.js")
const usermodel=require("./db/schema")

// use in application cookie
app.use(cookieParser())

// set views engine
app.set("views", path.join(__dirname, "views"))
app.set("view engine", "hbs")

// register partial
hbs.registerPartials(path.join(__dirname + '/views/partials'))

// register partial use middlewere
app.use(express.static(path.join(__dirname,'./public')))

// get data from client side middlewere
app.use(express.urlencoded({ extended: false }))
app.use(express.json())

// Router work
app.use("/",indexxRouter)

app.use("/",LoginRouter)
app.use("/",dashboardRouter)
app.use("/",RegistrationRouter)
app.use("/logout",(req,res)=>{
    try{
        res.clearCookie("loginToken")
        res.redirect("/login")
    }
    catch(err)
    {
        res.send("Error please try again")
    }
})


// dynamic data rendering
app.get("/index", (req, res) => {
    res.render("index", {
        Name: "Divya singh",
        age: "21",
        course: "backend"
    })
})

// By get read apidata from database
// app.get("/apidata", async (req, res) => {
//     let client = new MongoClient(connectionString)
//     let conn;
//     try {
//         conn = await client.connect()
//     } catch (err) {
//         console.log(err)
//     }
//     let db = await conn.db("studendpart1")
//     let collection = await db.collection("employee_data")
//     let data = await collection.find({})
//         .limit(50)
//         .toArray()
//     res.send(data)
//     console.log(data)
// })
// // by create data and strore in database
// app.post("/apidata", async (req, res) => {

//     let client = new MongoClient(connectionString)
//     let conn;
//     try {
//         conn = await client.connect()
//     }
//     catch (err) {
//         console.log(err)
//     }
//     let db = await conn.db("studendpart1")
//     let collection = await db.collection("employee_data")
//     let data = await collection.insertOne(req.body)
//     res.send(data)
//     console.log(data)
// })

app.listen(port, () => {
    console.log("server is listening")
})              