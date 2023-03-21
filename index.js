const  express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const {CONNECTDB} = require("./DatabaseConnection/connection");
const { ErrorHandler } = require("./ErrorHandler/ErrorHandler");
const AuthRouter = require("./routers/Users");
const ClassRouter = require("./routers/Class");
const app = express();

//middlewares
app.use(express.json());
app.use(cors({origin:'*'}));
app.use(helmet());

app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    next();
  });

//database connection
CONNECTDB("mongodb+srv://mbathi:shanicecole@cluster0.hex8l.mongodb.net/Student_Automation?retryWrites=true&w=majority");

//router 
app.use('/api/auth',AuthRouter);
app.use('/api/class',ClassRouter);

app.get('/', (req,res)=>{
 res.send("the student automation api");
});

//Error Handler
app.use(ErrorHandler);

//port listening
app.listen(5000,()=>{
console.log(`server is listening at ${5000}`);
});