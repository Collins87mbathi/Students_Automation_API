const  express = require("express");
const cors = require("cors");
const {CONNECTDB} = require("./DatabaseConnection/connection");
const { ErrorHandler } = require("./ErrorHandler/ErrorHandler");
const AuthRouter = require("./routers/Users");
const ClassRouter = require("./routers/Class");
const PerformanceRouter = require('./routers/Performance');
const AssignmentRouter = require("./routers/Assignment");
const app = express();

//middlewares
app.use(express.json());
app.use(cors({origin:'*'}));


//database connection
CONNECTDB("mongodb+srv://mbathi:shanicecole@cluster0.hex8l.mongodb.net/Student_Automation?retryWrites=true&w=majority");

 // Schedule the execution of getUpcomingClasses function everyday at 6:30 AM
 
//router 
app.use('/api/auth',AuthRouter);
app.use('/api/class',ClassRouter);
app.use('/api/assignment',AssignmentRouter);
app.use('/api/performance',PerformanceRouter);

app.get('/', (req,res)=>{
 res.send("The student automation API");
});


//Error Handler
app.use(ErrorHandler);

//port listening
app.listen(5001,()=>{
console.log(`server is listening at ${5001}`);
});