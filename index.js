const express = require('express');
const resumeRouter = require('./routes/resume.route')
const authRouter = require('./routes/auth.route')
const connectDB = require('./config/database')
const cors = require('cors');
const app = express();
const PORT = 8000 || process.env.PORT;

connectDB();

app.use(cors())

app.use(express.json());

app.get('/',(req,res)=>{

  res.send("Hello");

})

app.use('/api/resume',resumeRouter);
app.use('/api/auth',authRouter);



app.listen(PORT,()=>{
  console.log(`Server started at ${PORT}`)
})