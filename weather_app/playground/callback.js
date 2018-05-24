//user函数一共两个参数, 一个是用户ID,另一个是一个callback function,但是这个回调函数我们我们定义在当user函数被调用的时候. 所以我们只需要使用callback(userObject),把在user函数获取的用户数据传递回回调函数定义的地方即可.
let getUser = (id, callback) => {
    //下方的userObject等同于从其他地方获取到的数据.
    let userObject = {
        id,
        userName : 'Yan',
    };
    //使用setTimeout功能进行延迟,并调用回调函数的形式函数callback把用户数据传给真的回调函数.
    setTimeout(() => {
        //此时callback();拿到了userObject用户的信息,并传递回user调用时的回调函数.
        callback(userObject);
    }, 2000);
};

//调用user函数,并且代入参数.一个参数是id,另一个参数是回调函数.
//回调函数需要带有参数,这个参数是从callback(userObject);接收的userObject. 如果不写参数,则无法获得let声明的对象
//形参的名称可以随意修改,反正就是userObject会直接把信息转给形参.
getUser(22, (userInfo) => {
    //打印从user当中获取到的用户信息userobject.
    console.log(userInfo);
});