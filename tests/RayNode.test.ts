/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */

import { FakeClient } from './TestClasses/FakeClient';
import { Ray as RayNode } from './../src/RayNode';

let client: FakeClient, myRay: RayNode;

beforeEach(() => {
    RayNode.defaultSettings = {
        enable: true,
        host: 'localhost',
        port: 23510,
        local_path: null,
        remote_path: null,
        always_send_raw_values: false,
        not_defined: false,
    };

    client = new FakeClient();
    myRay = RayNode.create(client, 'fakeUuid');
    myRay.clearCounters();
});

it('sends an existing file payload', () => {
    myRay.file(`${__dirname}/TestData/test.txt`);

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a missing file payload', () => {
    myRay.file('missing.txt');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends an existing image file payload', () => {
    myRay.image(`${__dirname}/TestData/test.txt`);

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends an image url payload', () => {
    myRay.image(`http://localhost:35599/test.png`);

    expect(client.sentPayloads()).toMatchSnapshot();
});
