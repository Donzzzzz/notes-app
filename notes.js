const fs = require("fs");
const chalk = require("chalk");

const getNotes = () => {
  return "Your notes ...";
};

const readNote = title => {
  const notes = loadNotes();
  const note = notes.find(note => note.title === title);
  if (note) {
    console.log(chalk.green("Title: " + note.title));
    console.log("Body: " + note.body);
  } else {
    console.log(chalk.red.inverse("Note not found!"));
  }
};

const listNotes = () => {
  const notes = loadNotes();
  console.log(chalk.inverse("Your notes: "));
  notes.forEach(note => {
    console.log(note.title);
  });
};

const addNote = (title, body) => {
  const notes = loadNotes();
  // const duplicateNotes = notes.filter(note => note.title === title);
  const duplicateNote = notes.find(note => note.title === title);
  // console.log(duplicateNotes);
  //   debugger;
  if (!duplicateNote) {
    notes.push({
      title: title,
      body: body
    });
    saveNotes(notes);
    console.log(chalk.green.inverse("Note added"));
  } else {
    console.log(chalk.red.inverse("Note already exist"));
  }
};

const removeNote = title => {
  const notes = loadNotes();
  const duplicateNotes = notes.filter(note => note.title !== title);
  if (duplicateNotes.length !== notes.length) {
    // console.log(duplicateNotes);
    // console.log(notes.title);
    // notes.remove(title);
    saveNotes(duplicateNotes);
    console.log(chalk.green.inverse("Note Removed"));
  } else {
    console.log(chalk.red.inverse("No note found"));
  }
};

const saveNotes = notes => {
  const dataString = JSON.stringify(notes);
  fs.writeFileSync("notes.json", dataString);
};

const loadNotes = () => {
  try {
    const dataBuffer = fs.readFileSync("notes.json");
    const dataString = dataBuffer.toString();
    return JSON.parse(dataString);
  } catch (e) {
    return [];
  }
};

module.exports = {
  getNotes: getNotes,
  addNote: addNote,
  removeNote: removeNote,
  listNotes: listNotes,
  readNote: readNote
};
