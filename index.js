const path = require("node:path");
const express = require("express")
const mongoose = require("mongoose");
const { timeStamp } = require("node:console");


const app = express()
const PORT = process.env.PORT || 3000;

app.use(express.json())




const connectionURL ="mongodb://localhost:27017/todoDb";

mongoose.connect(connectionURL).then(() => console.log("Database connected successfully...")).catch((error) => console.log(error.message))

app.set("view engine", "ejs")

app.use(express.static(path.join(__dirname, "public")))
const todoSchema = mongoose.Schema({
    title: {type: String, 
        require: true, 
        unique: true, 
        trim: true, 
        maxlength: 20, 
        minlength: 5}, 
    desc: String

}, {timeStamp: true})

const TodoModel = mongoose.model("todo", todoSchema)
app.get("/", (req, res, next) => {
    try {

        res.render("index", {title: "List todo"})
        
    } catch (error) {
        res.status(500).json({message:error.message})
        
    }
})

app.get("/add-todo", (req, res, next) => {
    try{
        res.render("newTodo", {title: "Add todo"})

    } catch(error){
        res.status(500).json({message: error.message})
    }
})

app.get("/update-todo", (req, res, next) => {
    try{
     res.render("updateTodo", {title: "update todo"})

    } catch (error){
        res.status(500).json({message: error.message})

    }
})

app.get("/delete-todo", (req, res) => {
    try {
        res.render("deleteTodo", {title: "Delete todo"})
        
    } catch (error) {
        res.status(500).json({message: error.message})
        
    }
})

app.listen(PORT, () => {
    console.log(`Server is running on http://127.0.0.1:${PORT}`);
})