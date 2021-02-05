
const ray = require('./Ray').ray;

const sleep = (seconds) => {
    return usleep(seconds * 1000);
};

const usleep = (milliseconds) => {
    const start = new Date().getTime();
    while (new Date().getTime() < start + (milliseconds)) {}
};

function main() {

    const s = new Date().getTime();
    sleep(2);
    console.log(s);
    console.log(new Date().getTime());

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
