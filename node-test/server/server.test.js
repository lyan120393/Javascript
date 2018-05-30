//引入supertest Library, 这个是由express.js的作者写的
const supertest = require('supertest');
//引入expect
const expect = require('expect');
//不需要引入Mocha, 因为带有.test.js后缀的文件, Mocha会自动启动. 而且Mocha已经在DevDependencies当中

//把我们的位于根目录下的server.js文件的app导入.  
let app = require('./server.js').app;

describe('server test', () => {
    //使用测试框架Mocha, 必须先用it. 因为server app是aSync,所以使用done.
it('Should test for a server app', (done) => {
    //调用supertest,并把app传入
    supertest(app)
        //设置http handler的get方法,以及路由
        .get('/users')
        //使用expect检测返回的 code status
        .expect(200)
        //使用expect执行函数,并把res作为参数调用.
        .expect((res) => {
            //使用expect检测res.body当中是否包含我们指定的对象
            expect(res.body).toInclude({
                name : 'LongyituoYan',
                age : 25
            })
        })
    //必须使用.end 作为结尾, 才可以确保supertest执行成功.且不要忘记done,因为server app是aSync.
    .end(done);
})
})

