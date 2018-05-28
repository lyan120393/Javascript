let aSyncMulti = (a, b) => {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (typeof a === 'number' && typeof b === 'number'){
                resolve(a * b);
            }else{
                reject('a and b must be number');
            }
        }, 2000);
    });
;}

aSyncMulti(4, 5).then((result_1) => {
    console.log(`The Resualt is: ${result_1}`);
}).catch((errorMessage) => {
    console.log(`Error: ${errorMessage}`);
});