import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import cors from 'cors';
import dotenv from "dotenv"
dotenv.config()


const app = express()
app.use(cors())
app.use(bodyParser.json())
app.get("/", (req, res)=> {
    res.send("hello reader")
})

// db instanciation
const {connect, Schema, model} = mongoose
//const pw="C0denCQRT"
const dbUri = process.env.MONGODB_URI //|| `mongodb+srv://fabezio:${pw}@cluster0.0r1tc.mongodb.net/${dbName}?retryWrites=true&w=majority`
const dbName= process.env.MONGODB_DB // || "examples"
console.log (dbUri)

connect(dbUri, {
    useCreateIndex: true, 
    useFindAndModify: false,
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(()=> console.log(dbName, "ready.")).catch(err=>console.error(err))

const mealSchema = new Schema({dish: String})
const Meal = model("Meal", mealSchema)


// routing
const router = express.Router()
// const route = router.route

app.use("/meals", router)
router.route("/").get((_, res)=> {
    Meal.find({}, (err, found)=> {
        err
            ? console.log("an error occured")
            : res.status(200).send(found)
    })
    

})
router.route("add").post((req, res) => {
    const newMeal = new Meal({dish: req.body})
    console.log(req.body)
    //const newMeal = new Meal(req.body)
    res.send(req.body)
})

app.listen(4000, ()=> console.log("server up and ready..."))