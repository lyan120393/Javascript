const yargs = require('yargs');
const geocode = require('./geocode/geocode');

let argv = yargs
    .option({  //这个是Option API,可以在yargs文档里查到.
        'address' :{
            describe : 'This is a physical address.', //描述这个是做什么的
            demand : true, //是否为必须提供项
            alias : 'a', //别名,位于北别名当中,可以‘-’也可以‘--’,但是本身的名字必须‘--’. 无论别名还是本身名都不可以不加Hyphen, 否则就会进入到'_:[]'这个下划线的数组当中了. 这里都是放不带有Hyphen命令的指令.
            string : true, //确认返回的是一个字符串类型的数据, 之前的例子是返回的是Json类型.
        }
    })
    .help() 
    .alias('help', 'h')
    .argv;
//geocode当中包含两个参数,第一个是错用户输入的地址, 另一个是一个回调函数包含两个参数(第一个是错误信息的内容, 第二个是一个叫做resualt的对象);
//回调函数的参数,是不需要用户在调用geocode的时候赋予的,他们是通过geocode函数执行时传递回来的.
geocode.geocode(argv.address,(errorMessage, resualts) => {
    //使用if(errorMessage)来去判断是否存在errorMessage的信息.如果存在则直接输出resualt的对象内容.
    if (errorMessage){
        console.log(errorMessage);
    }else{
        // console.log(`The address is ${resualts.address}`);
        // console.log(`Longitude is ${resualts.longitude}`);
        // console.log(`Latitude is ${resualts.latitude}`);
        console.log(JSON.stringify(resualts, undefined, 2));
        geocode.getweather(resualts.latitude, resualts.longitude, (WeatherErrorMessage, weatherInfo) =>{
            if (WeatherErrorMessage){
                console.log(WeatherErrorMessage);
            }else{
                console.log(JSON.stringify(weatherInfo, undefined, 2));
            }
        })
    }
});


