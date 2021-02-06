
const ray = require('./../dist/index.cjs').ray;

const sleep = (seconds) => usleep(seconds * 1000);
const usleep = (milliseconds) => {
    const start = new Date().getTime();
    while (new Date().getTime() < start + (milliseconds)) {}
};

function main() {

    ray().xml('<one><two><three>3333</three></two></one>');

    ray('hello world 3!').green();

    ray().table(['one', 'two', 'three', 'four']);
}

main();
