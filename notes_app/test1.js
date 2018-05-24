const fs = require('fs');
//写入
let obj = {
    name: 'LongyituoYan',
    age: 6,
    school: 'Troy University',
};

let stringObj = JSON.stringify(obj);

console.log(typeof stringObj)
console.log(stringObj);

fs.writeFileSync('notebank.js', stringObj);

//读取
let stringObj = fs.readFileSync('notebank.json');
let obj = JSON.parse(stringObj);

console.log(typeof obj);
console.log(obj.name);

