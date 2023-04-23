const  express = require("express");
const cors = require("cors");
const {CONNECTDB} = require("./DatabaseConnection/connection");
const { ErrorHandler } = require("./ErrorHandler/ErrorHandler");
const AuthRouter = require("./routers/Users");
const ClassRouter = require("./routers/Class");
const PerformanceRouter = require('./routers/Performance');
const AssignmentRouter = require("./routers/Assignment");
const twilio = require('twilio');
const cron = require('node-cron');
const Assignment = require("./models/Assignment");
const moment = require('moment/moment');
const Class = require("./models/Class");
const User = require("./models/Users");
const accountSid = 'AC2bfe4bf126f9f98cf620f73959563da6';
const authToken = '151c47aeccba0898f23afb73cde2bc7e';
const client = twilio(accountSid, authToken);
const app = express();


//middlewares
app.use(express.json());
app.use(cors({origin:'*'}));
//database connection
CONNECTDB("mongodb+srv://mbathi:shanicecole@cluster0.hex8l.mongodb.net/Student_Automation?retryWrites=true&w=majority");

//Assignment notification 
const notifyAssignments = async (userId) => {
    try {
      // Get all assignments due in the next 24 hours
      const assignments = await Assignment.find({ userId });
  
      // Send an SMS notification for each assignment due within 24 hours
      assignments.forEach((assignment) => {
        console.log(assignment.date);
        const dueDate = new Date(assignment.date);
        console.log("due date" + dueDate);
        const timeDiff = dueDate - Date.now();
        const threeHoursInMs = 3 * 60 * 60 * 1000;
        const threeHoursBeforeDue = dueDate - threeHoursInMs;
        const oneHourInMs = 1 * 60 * 60 * 1000;
        const oneHourBeforeDue = dueDate - oneHourInMs;
  
        if (threeHoursBeforeDue <= Date.now()) {
          // Assignment is due in less than 3 hours
          client.messages.create({
            body: `Your assignment "${assignment.title}" is due in less than 3 hours.`,
            from: "+15855361346",
            to: "+254791686851"
          });
        } else if (oneHourBeforeDue <= Date.now()) {
          // Assignment is due in less than 1 hour
          client.messages.create({
            body: `Your assignment "${assignment.title}" is due in less than 1 hour.`,
            from: "+15855361346",
            to: "+254791686851"
          });
        }
      });
    } catch (error) {
      console.error(error);
    }
  };
  
  const fetchingUser =  async () => {
    console.log("i am working");
    try {
      const users = await User.find();
      users.forEach((user) => {
        notifyAssignments(user._id);
      });
    } catch (error) {
      console.error(error);
    }
  }; 
  fetchingUser();


  //Class Notification 

  const notifyClasses = async (userId) => {
    try {
        // const userId = req.user.id;
        const currentDay = moment().format('dddd');
        const classes = await Class.find({ userId, day: currentDay }).sort({ time: 1 });
        for (let i = 0; i < classes.length; i++) {
          const { title, time, lecturer } = classes[i];
    
            const message = `You have a class on ${currentDay} at ${time}. The class is ${title} and your lecturer is ${lecturer}.`;
            try {
          
              await client.messages.create({
                body: message,
                from: "+15855361346",
                to: '+254791686851'
              });
              console.log(`SMS sent for class: ${title}`);
            } catch (error) {
              console.log(`Failed to send SMS for class: ${title}. Error: ${error}`);
            } 
        }
        res.status(200).json(classes);
      } catch (err) {
        console.log(`Failed to get upcoming classes. Error: ${err}`);
      }
}

cron.schedule('15 6 * * *',async () => {
    console.log("i am working");
    try {
      const users = await User.find();
      users.forEach((user) => {
        notifyClasses(user._id);
      });
    } catch (error) {
      console.error(error);
    }
  });
 
//router 
app.use('/api/auth',AuthRouter);
app.use('/api/class',ClassRouter);
app.use('/api/assignment',AssignmentRouter);
app.use('/api/performance',PerformanceRouter);

app.get('/',(req,res)=>{
 res.send("The student automation API");
});


//Error Handler
app.use(ErrorHandler);

//port listening
app.listen(5001,()=>{
console.log(`server is listening at ${5001}`);
});