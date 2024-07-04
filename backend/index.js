const express=require("express")
const cors=require("cors")
const mongoose=require("mongoose")


const salaryroutes=require("./routes/applicattionroutes")
const vacancyroutes=require("./routes/vacancyroutes")


const app=express();

app.use(cors())
app.use(express.json())

const PORT=process.env.PORT||8060


app.use("/",salaryroutes);


app.use("/",vacancyroutes);



 
 
 //Server connection
 mongoose.connect("mongodb+srv://avishka:avishka@salonsystem.ybwyyzz.mongodb.net/Saloon_System?retryWrites=true&w=majority")
 .then(()=>{
   
     console.log(`port number => ${PORT}`)
     app.listen(PORT,()=>console.log("server connection successful"))
 }).catch((err)=>{
     console.log(err)
 })
 