const express = require("express")
const app= express()
const PORT=8000;
var cors = require('cors');
const { connectToDatabase } = require("./database");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");
const reportRouter = require("./routes/report")
const mriRouter = require("./routes/mri")




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
                        app
            
            // USER REQUESTS 
                        app.get("/get-user-by-id/:userId",userRouter)

            //Report Analysis REQUESTS
                        app.post("/add-files-to-report",reportRouter)
                        app.post("/analyze_report/:id",reportRouter)
                        app.get("/get-report-by-id/:id",reportRouter)
                        app.get("/delete-report-id/:id",reportRouter)
            
            //Report Analysis REQUESTS
                        app.post("/analyze_mri",mriRouter)
                        app.get("/get-mri-by-id/:id",mriRouter)
                        app.delete("/delete-mri-by-id/:id",mriRouter)

        })  
    } catch (error) {
        console.log(`Error Connecting to the database: ${error}`)   
    }
})

