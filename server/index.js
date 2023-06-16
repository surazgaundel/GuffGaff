const express = require("express");
const app=express();
require('dotenv').config();
const cors=require("cors");
const mongoose=require("mongoose");
const userRoutes=require("./routes/userRoutes");

app.use(cors());
app.use(express.json());
app.use('/api/auth',userRoutes);

mongoose.connect(process.env.MONGO_URL, {useNewUrlParser:true, useUnifiedTopology:true})
.then(()=>console.log("Connected to MongoDB"))
.catch(err=>console.log(err.message))


app.get('/', (req, res) =>{
        res.send('Hello')
    })
    
const port = process.env.PORT;

app.listen(port, () => console.log(`Server running on port ${port} 🔥`));