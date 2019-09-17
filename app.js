// const add = require("./utils");

// const sum = add(4, -2);

// console.log(sum);

const notes = require("./notes");

// const msg = getNotes();

// console.log(msg);

// console.log(validator.isURL("www.google.com"));
// console.log(chalk.red.bold.inverse("Error!"));

const yargs = require("yargs");
const chalk = require("chalk");
const validator = require("validator");

// const command = process.argv[2];
// if (command === "add") {
//   console.log("Adding note!");
// } else if (command === "remove") {
//   console.log("Removing note!");
// }

// Customize yargs version
yargs.version("1.1.0");

// Create add command
yargs.command({
  command: "add",
  describe: "Add a new note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true, //without title, it won't work. Force to have title
      type: "string" //title without =, give it a sting '', instead of boolean
    },
    body: {
      describe: "Note body",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    // console.log("Title: " + argv.title);
    // console.log("Body: " + argv.body);
    // console.log(argv);
    notes.addNote(argv.title, argv.body);
  }
});

// Create remove command
yargs.command({
  command: "remove",
  describe: "Remove a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    notes.removeNote(argv.title);
    // console.log("Removing the note!");
  }
});

// Create list command
yargs.command({
  command: "list",
  describe: "List all notes",
  handler() {
    notes.listNotes();
    // console.log("Listing all the notes!");
  }
});

// Create read command
yargs.command({
  command: "read",
  describe: "Read a note",
  builder: {
    title: {
      describe: "Note title",
      demandOption: true,
      type: "string"
    }
  },
  handler(argv) {
    // console.log("Reading a note!");
    notes.readNote(argv.title);
  }
});

// add, remove, read, list

yargs.parse();
//console.log(yargs.argv);
