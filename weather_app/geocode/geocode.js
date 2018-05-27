const request = require('request');
//address用于接受用户的输入, callback是一个回调函数. 这两个都是geocode的参数.
let geocode = (address, callback) => {
    let encodeAddress = encodeURIComponent(address);
    request({
        url : `https://maps.googleapis.com/maps/api/geocode/json?address=${address}&key=AIzaSyBZ0YJSlZj0sA_dyzywGJ2WLfw_I3wOVa4`,
        json : true,
    },(error, response, body) => {
        if (error){
            //如果request的error存在错误的内容,那么设置回调函数的第一个值为如下字符串,第二个不需要输入因为不会用到.
            callback('Cannot connect to the google server.')
        }else if(body.status === 'ZERO_RESULTS'){
            //替换callback函数的第一个参数的内容为如下字符串.
            callback('The address you typed in is invalid.')            
        }else if(body.status === 'OK'){
            //如果一切OK,那么自然给callback的第一个参数设置为undefined,并且给予第二个参数resualts对象的属性.
            callback(undefined, {
                address: body.results[0].formatted_address,
                latitude: body.results[0].geometry.location.lat,
                longitude: body.results[0].geometry.location.lng,
            })
         // console.log(JSON.stringify(response, undefined, 2));
        }else{
            console.log('Unknown problem.')
        }
    });
    
};

let getweather = (lat, lng, callback) => {
    request({
        url : `https://api.darksky.net/forecast/4d64296d2008aec295648001c4097053/${lat},${lng}`,
        json : true,
    }, (error, response, body) => {
        if (error){
            callback('Unable to connect Dark Sky APIs server.');
        }else if(response.statusCode === 400){
            callback(`Unable to fetch weather Info from Dark Sky APIs.`);
        }else{
            callback(undefined, {
                summary : body.currently.summary,
                temperature : body.currently.temperature,
                windSpeed : body.currently.windSpeed,
                visibility : body.currently.visibility,
            });
        };
    });
}

module.exports = {
    geocode,
    getweather,
};