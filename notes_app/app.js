// console.log("Starting in app.js");

const fs = require("fs");
const _ = require("lodash");
const yargs = require("yargs");

const notes = require("./notes.js");

let addOption = {
    title : {
        describe : 'Title of a Notes',
        demand : true,
        alias : 't',
    },
    body : {
        describe : 'Body of the Notes',
        demand : true,
        alias : 'b',
    }
};
let readOption = {
    title : {
        describe : 'The title of the note you want to read',
        demand : true,
        alias : 't',
    }
};
let removeOption = {
    title : {
        describe : 'The title of the note you want to remove',
        demand : true,
        alias : 't',
    }
};

var argv = yargs.command('add', 'Add new note', addOption)
.command('list', 'List all of notes saved here')
.command('read', 'The title of the note you want to read', readOption)
.command('remove', 'The notes you want to remove', removeOption)
.help()
.argv;
var command = argv._[0];

console.log("当前的输入的旗标是: " + command);
debugger;
if (command === 'list') {
    //console.log("显示当前的全部笔记列表!")
    let allNotes = notes.getAll();
    console.log(`Printing ${allNotes.length} notes: `)
    allNotes.forEach((note) => {
        notes.logNote(note);
    })
}else if (command === 'read') {
    //console.log("地区当前全部的笔记列表!")
    let result = notes.readNote(argv.title);
    if (result) {
        console.log('Note has been found');
        notes.logNote(result);
    }else{
        console.log('Note not found');
    }
}else if (command === 'remove') {
    //console.log("移除当前全部的笔记内容!")
    let result = notes.removeNotes(argv.title);
    let message = result ? 'Note has been removed' : 'Note not Found';
    console.log(message);
}else if (command === 'add') {
    // console.log("添加一篇新的笔记")
    let note = notes.addNote(argv.title, argv.body);
    if (note){
        console.log(`Add Note ${note.title} Successful!`);
        notes.logNote(note);
    }else {
        console.log('Title 重复了,无法进行存储');
    };
    
}else {
    console.log("输入的旗标为未定义!")
};



