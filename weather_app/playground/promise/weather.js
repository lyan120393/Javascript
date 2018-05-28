const request = require('request');

//把Promise对象设置为geocode的返回值.
let geocode = (address) => {
    //返回一个promise对象.这个箭头函数是Promise对象的唯一参数. 但是这个箭头函数有两个参数(resolve 和 reject);
    return new Promise((resolve, reject) => {
        //编译address地址为encodeAddress.
        let encodeAddress = encodeURIComponent(address);
        //使用request包发送一个http请求给服务器. 
        request({
            url : `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBZ0YJSlZj0sA_dyzywGJ2WLfw_I3wOVa4`,
            json : true,
        },(error, response, body) => {
            if (error){
                //错误处理:如果满足条件,则会得到一个错误.使用reject函数去把Promise的错误传递到Promise的外层.
                reject('Cannot connect to Google Server.');
            }else if(body.status === 'ZERO_RESULTS'){
                //错误处理:如果满足条件,则会得到一个错误.使用reject函数去把Promise的错误传递到Promise的外层.
                reject('The address you typed in is invalid.');
            }else if(body.status === 'OK'){
                //如果满足所期望的返回内容, 使用resolve进行返回.
                //因为resolve只能接受一个参数,所以我们可以把多个参数转化为一个对象进行传递到Promise对象外层.
                resolve({   
                    address: body.results[0].formatted_address,
                    latitude: body.results[0].geometry.location.lat,
                    longitude: body.results[0].geometry.location.lng,});
            };
        });
    });
;}

//getWeather函数用来接收geocode得到的地理位置信息的结果, 那就是result.
let getWeather = (result) => {
    return new Promise((resolve, reject) => {
        let lat = result.latitude;
        let lng = result.longitude;
        request({
            url : `https://api.darksky.net/forecast/4d64296d2008aec295648001c4097053/${lat},${lng}`,
            json : true,
        }, (error, response, body) => {
            if (error){
                reject(`Unable to connet weather server.`)
            }else if(response.statusCode === 400){
                reject(`Unable to fetch weather Info from Dark Sky APIs.`)
            }else{
                resolve({
                    summary : body.currently.summary,
                    temperature : body.currently.temperature,
                    windSpeed : body.currently.windSpeed,
                    visibility : body.currently.visibility,
                });
            };
        });
    });
};

//调用geocode并用户输入的地址作为参数.
//此时进入已经声明好的geocode函数进行处理(把地址转为encode,然后发送request等待数据返回).
//如果数据返回成功, 那么geocode的Promise对象的状态就是resolve,此时执行.then后面的语句.
geocode(99163).then((result) => {
    // console.log(JSON.stringify(result, undefined, 2));
    console.log(result.address);
    //把geocode获得的成功结果result传递给getWeather函数.
    //如果getWeather运行成功那么执行.then的语句,否则执行.catch.
    //不位于同一层级的.catch功能无法catch不同层级发生的错误.此时我们位于geocode.then()当中,所以针对于geocode.catch无法捕获内部层发生的错误.
    getWeather(result).then((result) => {
        console.log(JSON.stringify(result, undefined, 2));
        //.catch用来捕获当geocode运行成功时,getWeather发生的错误;
    }).catch((errorMessage) => {
        console.log(`Error: ${errorMessage}`);
    });
}).catch((errorMessage) => {
    console.log(`Error: ${errorMessage}`);
});
