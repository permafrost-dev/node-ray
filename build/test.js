
const ray = require('./../dist/index.cjs').ray;

const sleep = (seconds) => usleep(seconds * 1000);
const usleep = (milliseconds) => {
    const start = new Date().getTime();
    while (new Date().getTime() < start + (milliseconds)) {}
};

function main() {

    ray().measure('main');


    usleep(300);

    ray().measure('main');

    usleep(400);

    ray().measure('main');

    usleep(1100);

    ray().measure('main');

    //ray().xml('<one><two><three>3333</three></two></one>');

    //ray('hello world 3!').green();

    //ray().table(['one', 'two', 'three', 'four']);
}

main();
