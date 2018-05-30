const utils = require('./utils.js');
const expect = require('expect');

it('should add two numbers', () => {
    let res = utils.add(33, 66);
    //使用expect(res)的含义是, 我们期待res的数值是....
    //toBe(99)期待的数值是99.
    //toBeA(’number‘)期待的数据类型为数字.
    //如果这一切都是顺利的, 那么就会pass, 否则就是test fail.
    expect(res).toBe(99).toBeA('number');
})

it('should get square of a number', () => {
    let res = utils.square(9);
    expect(res).toBe(81).toBeA('number');
})
//使用expect的toInclude去验证是否字符串被包含,以及toBeA验证是否是对象.
it('shoule verify user first and last name', () => {
    let res = utils.username({
        age : 25,
        location : 'Beijing'
    }, 'Longyituo Yan');
    expect(res).toInclude({
        firstname : 'Longyituo',
        lastname : 'Yan',
    }).toBeA('object');
});

it('Should be a aync square multi same number twice', (done) =>{
    utils.asyncSquare(4, (res) => {
        expect(res).toBe(16).toBeA('number');
        done();
    });
});

it('Should be a sync add two numbers', (done) => {
    utils.asyncAdd(1, 2, (sum) => {
        expect(sum).toBe(3).toBeA('number');
        done();
    });
});
