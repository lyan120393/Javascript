let add = (a, b) => a + b;
let square = (a) => a * a;
let username = (user, fullname) => {
    //使用.split()方法,把输入的字符串根据空格分开并存入names数组的0和1的位置.
    let names = fullname.split(' ');
    user.firstname = names[0];
    user.lastname = names[1];
    return user;
};

let asyncSquare = (a, callback) => {
    setTimeout(() => {
        callback(a * a);
    }, 50)
};
let asyncAdd = (a, b, callback) => {
    setTimeout(() => {
        callback(a + b);
    }, 50);
};

 
module.exports = {
    add,
    square,
    username,
    asyncSquare,
    asyncAdd
};