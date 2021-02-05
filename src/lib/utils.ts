/* eslint-disable no-empty */

export const sleep = (seconds: number) => {
    return usleep(seconds * 1000);
};

export const usleep = (milliseconds: number) => {
    const start = new Date().getTime();
    while (new Date().getTime() < start + milliseconds) {}
};
