const express = require("express");
const app = express();
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 4000;
const Note = require("./models/Notes");
require("dotenv").config();

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//Connect to mongoose
mongoose
  .connect("mongodb://0.0.0.0:27017/ReactNativeNote")
  .then(() => console.log("Database Connected"))
  .catch((error) => console.log(error));

//CREATE OPERATION
app.post("/addNote", async (req, res) => {
    const title = req.body.title;
    const note = req.body.note;

    const newNote = new Note({
        title,
        note
    });

    await newNote.save();

    console.log("Note Added")
    const allNotes = await Note.find({});
    res.json(allNotes)
})

//READ ENDPOINT
app.get("/notes", async (req, res) => {
  try {
    const allNotes = await Note.find({})
    res.json(allNotes)
  } catch (error) {
    console.log(error)
  }
})

//FETCH ONE NOTE
app.get("/oneNote/:id", async (req, res) => {
  try {
    const oneNote = await Note.findById({_id: req.params.id})
    res.json(oneNote)
  } catch (error) {
    console.error(error)
  }
})

//Update the note
app.put("/update/:id", async (req, res) => {
  const {id} = req.params;
  const title = req.body.title;
  const note = req.body.note;

  try {
    if(!title || !note){
      return res.status(400).json({error: "Title and note are required"})
    }

    const updatedNote = await Note.findByIdAndUpdate( id, {title, note})
    if(!updatedNote){
      return res.status(400).json({ error: "Note not found"})
    }
    res.status(200).json({message: "Note updated"})
  } catch (error) {
    console.error(error)
  }
})

//DELETE OPERATION
app.delete("/delete/:id", async (req, res) => {
  try {
    const deleteNote = await Note.findByIdAndDelete({ _id: req.params.id})
    if(!deleteNote){
      return res.status(400).json({ error: "Note not found"})
    }
    res.status(200).json({message: "Note deleted"})
  } catch (error) {
    console.error(error)
  }
})

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
