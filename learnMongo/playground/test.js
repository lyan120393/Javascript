const {MongoClient} = require('mongodb');
const assert = require('assert');

let databaseUrl = 'mongodb://localhost:27017/test';


let open = (databaseUrl) => {
    return new Promise((resolve, reject) => {
        //通过connect返回的结果有连个,一个是错误对象err,另一个是client对象.
        MongoClient.connect(databaseUrl, (err, client) => {
            if (err) {
                reject(err);
            }
                resolve(client);
        });
    });
};
//现在不可以使用db进行关闭数据了, 只能使用client进行关闭.
let close = (client) => {
    client.close();
};

let insert = (db,collection,obj) => {
    db.collection(collection).insertOne(obj);
    //使用toArray把结果返回为数组, 此时才可以使用数组原型链中定义的.forEach功能.
    db.collection(collection).find({}).toArray((err, docs) => {
        if (err){
            console.log(`Connot insert ${obj} in collection ${collection} in Database ${db}`)
        } else {
            //forEach需要的是大写
            docs.forEach((doc) => {
            console.log(doc.name);
        });
        }
    });
};



open(databaseUrl).then((client) => {
    //通过对返回的client对象的.db属性进行设置,才能够指定数据库是哪个.
    //然后,才可以使用db这个用作表示数据库的对象进行操作.
    let db = client.db('test');
    console.log(`Database has been connected successfully`);
    insert(db,'movies',{'name':'TuenLi'});
    close(client);
}).catch((err) => {
    console.log(`Cannot connect Databse: ${err}`);
});

console.log(`progress end`);



