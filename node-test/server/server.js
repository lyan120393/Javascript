const express = require('express');

//创建一个server app
let app = express();

//设置路由为/
app.get('/', (req, res) => {
    res.send('Hello World');
});

//设置路由为/users,并定义反馈的数据
app.get('/users', (req, res) => {
    res.send([
        {
            name : 'LongyituoYan',
            age : 25
        },
        {
            name : 'TuenLi',
            age : 25
        },
        {
            name : 'Fengfan',
            age : 25
        }
    ]);
});
//对server进行监听
app.listen(3000, () => {
    console.log('Server is on the 3000 port.')
});

//exports出去, 这样其他的文件可以访问到这个app.
module.exports = {
    app,
}