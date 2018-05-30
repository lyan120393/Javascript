//Spice是在expect库当中的,所以使用spice之前需要引用expect库.
const expect = require('expect');

//使用describe 让测试输出结果更有组织性
describe('Spice test', () => {
    //使用it进行测试
    it('Should be test does the spy() called', () => {
        //创建spy function 通过 expect.createSpy.
        let spy = expect.createSpy();
        //调用Spy(), 这个可以插入在真的程序代码之中,一旦目标function被调用,那么spy就会被调用,那么我们就可以收到结果.
        spy(25);
        //进行检测spy功能是否被调用.
        expect(spy).toHaveBeenCalledWith(25);
    })
})