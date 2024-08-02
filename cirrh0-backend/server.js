const express = require("express")
const app= express()
const PORT=8000;
var cors = require('cors');
const { connectToDatabase } = require("./database");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");



app.use(cors());
connectToDatabase().then(()=>{
    try {
        app.listen(PORT,()=>{
            console.log("Connected To Database");
            app.use(express.json())

            // AUTH REQUESTS
                        app.post("/register",authRouter)
                        app.post("/login",authRouter)
                        app.post("/logout",authRouter)
                        app.delete("/delete-all-data",authRouter)
            
            // USER REQUESTS 
                        app.get("/get-user-by-id/:userId",userRouter)

        })  
    } catch (error) {
        console.log(`Error Connecting to the database: ${error}`)   
    }
})

