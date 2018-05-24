// console.log("Starting in notes.js");
const fs = require('fs');

var add = (a, b) => {
  return a + b;
};

let fetchNotes = () => {
    //防止如果当前文件不存在,会导致fs.readFileSync无法读取,会导致crash的错误.所以使用 try and catch.
    //try和catch必须一起使用. 一旦且仅当try的block出现了一个错误,才会执行catch当中的block.
    try {
      //使用读取功能,把当前的存储内容读取出来,并存入notes数组中,之后在和新写入的笔记一起进行存储.
      let notesString = fs.readFileSync('notebank.json');
      return JSON.parse(notesString); //把JSON字符串转化为notes数组的值并进行赋值.
    }catch (e){
      return [];
    }
};

let saveNotes = (notes) => {
  fs.writeFileSync('notebank.json', JSON.stringify(notes));
};

var addNote = (title, body) =>{
  let notes = fetchNotes();//如果json文件不存在,就给予一个空数组[];
  let note = {
    title,
    body,
  };

  //防止笔记的title一致,可以使用notes.filter的功能去进行判断,如果title名称一致就不存储.
  var duplicateNotes = notes.filter((note) => note.title === title);//这是一个回调函数.
  if (duplicateNotes.length === 0){
    //写入功能会自动的抹掉所有的数据
    notes.push(note);
    saveNotes(notes);  
    return note;
  }else{
    //设置note.title为'NA',可以让外部读取到.title里面的值,但是根据let的原因,内部无法修改外部的值.所以是undefined.
    // return note.title = 'NA';
    // console.log(note.title);
  };
};

var getAll = () => fetchNotes();
var readNote = (title) => {
  let notes = fetchNotes();
  let filternotes = notes.filter((note) => note.title === title);
  return filternotes[0];
};
var removeNotes = (title) => {
  // console.log("Remove all the content of the notes, which title is ", title);
  let notes = fetchNotes();
  let filterNotes = notes.filter((note) => note.title !== title);
  //array.filter(true)返回boolean的值为true的话,这个note就不会被过滤.
  saveNotes(filterNotes);
  return notes.length !== filterNotes.length;
  console.log('the note of the title has been removed');
};
let logNote = (note) => {
  console.log('---');
  console.log(`Title: ${note.title}`);
  console.log(`Body: ${note.body}`);
  //console.log('---');
};
module.exports = {
    add,
    addNote,
    getAll,
    readNote,
    removeNotes,
    logNote,
};