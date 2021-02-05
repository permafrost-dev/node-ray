import { usleep, sleep } from '../../src/lib/utils';

test('it sleeps for 1 second', () => {
    const start = new Date().getTime();
    sleep(1);
    const finish = new Date().getTime();

    expect(Math.floor((finish - start) / 10)).toBe(100);
});

test('it sleeps for 200 milliseconds', () => {
    const start = new Date().getTime();
    usleep(200);
    const finish = new Date().getTime();

    expect(Math.floor((finish - start) / 10)).toBe(20);
});
