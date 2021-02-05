
//const ray = require('./Ray').ray;
const ray = require('./../dist/index.cjs').ray;
//import { ray } from './../dist/index.mjs');

const sleep = (seconds) => {
    return usleep(seconds * 1000);
};

const usleep = (milliseconds) => {
    const start = new Date().getTime();
    while (new Date().getTime() < start + (milliseconds)) {}
};

function main() {

const val = {object: {}};
val.circularReference = val;
val[Symbol('foo')] = 'foo';
val.map = new Map([['prop', 'value']]);
val.array = [-0, Infinity, NaN, 'test string'];

const t = function(a, b) { console.log(a, b); };
class Test1 {
    a = 1;
}


    ray().table([val, t, Test1, new Test1(), {name: 'one', age: 18}, t, 'three', 'four']);

    ray().xml('<one><two><three>3333</three></two></one>');

    ray('hello world 3!').green();

    ray().table(['one', 'two', 'three', 'four']);

    //let c = 'blue';
    //for(let i = 0; i < 10; i++) {
    //    setTimeout( () => { ray().count('abc').color(c); c = c === 'blue' ? 'green' : 'blue'; }, i * 1000);
    //}

    /*
        let r = await ray('test pause').pause();
        console.log(r, typeof r);

        if (!r) {
            return;
        }
    */    
}

main();
