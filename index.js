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

app.listen(PORT, () => {
  console.log(`Server started at port ${PORT}`);
});
