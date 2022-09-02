
const ray = require('./../dist/index.cjs').ray;

const sleep = (seconds) => usleep(seconds * 1000);
const usleep = (milliseconds) => {
    const start = new Date().getTime();
    while (new Date().getTime() < start + (milliseconds)) {}
};

class TestOne {
    abc() {
        this.def();
    }

    def() {
        this.ghi();
    }

    ghi() {
        ray('hello').blue();
        const closure = () => {
            ray().trace();
        };

        closure();
    }
}

async function main() {


        ray('hello world 3!').green();

        //ray().table(['one', 'two', 'three', 'four']);

        const myclass = new TestOne();

        myclass.abc();

        ray().confetti();
}

main();
