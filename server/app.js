const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const dbHelper = require("./dbHelper/dbHelper")
const app = express();
// const port = process.env.PORT || 9000;
const port = 9000        
app.use(cors())
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json({limit: "20mb"}));
// , upload.single('coverImage')

app.get("/", (req,res) => {
    res.send("<h1>Welcome to Compus Management System.</h1>")
})
app.use('/student', require('./module/student/studentRoutes'))
app.use('/company',require('./module/company/companyRoutes'))
app.use('/job',require('./module/jobs/jobRoutes'))
app.use('/candidate',require('./module/appliedCandidates/applyCandidatesRoutes'))

app.get("*", (req, res) => {
    res.send("<h1>Welcome to Compus Management System.</h1>")
})

app.listen(port, (err) => {
    if (err) {
        console.log("Error in listening at " + port);
        console.log(err);
        return;
    }
    console.log("Server Started Successfully..!")
    dbHelper.connectWithDB()
})