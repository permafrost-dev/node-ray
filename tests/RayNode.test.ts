/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */
import { expect, it, beforeEach } from 'vitest';

import { Hostname } from '../src/Origin/Hostname';
import { HostnameNode } from '../src/Origin/HostnameNode';
import { Ray as RayNode } from './../src/RayNode';
import { FakeClientNode } from './TestClasses/FakeClientNode';
import { usleep } from '@/lib/utils';

let client: FakeClientNode, myRay: RayNode;

beforeEach(async () => {
    Hostname.set('fake-hostname');
    HostnameNode.set('fake-hostname');

    RayNode.defaultSettings = {
        enable: true,
        host: 'localhost',
        port: 23510,
        local_path: null,
        remote_path: null,
        always_send_raw_values: false,
        not_defined: false,
    };

    client = new FakeClientNode();
    myRay = await RayNode.create(client, 'fakeUuid');
    myRay.clearCounters();
});

it('sends an existing file payload', () => {
    myRay.file(`tests/TestData/test.txt`);

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a missing file payload', () => {
    myRay.file('missing.txt');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends an existing image file payload', () => {
    myRay.image(`tests/TestData/test.txt`);

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends an image url payload', () => {
    myRay.image(`http://localhost:35599/test.png`);

    expect(client.sentPayloads()).toMatchSnapshot();
});

it("doesn't send data when in production environment", () => {
    myRay.send('test 1');
    process.env.NODE_ENV = 'production';
    myRay.send('test 2');
    process.env.NODE_ENV = 'development';

    expect(client.sentPayloads().length).toBe(1);
});

it("doesn't send data when in staging environment", () => {
    myRay.send('test 1');
    process.env.NODE_ENV = 'staging';
    myRay.send('test 2');
    process.env.NODE_ENV = 'development';

    expect(client.sentPayloads().length).toBe(1);
});

it('measures the execution time of a closure', async () => {
    myRay.measure(() => {
        usleep(200);
    });

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('measures the execution time of repeated and unnamed calls to measure', async () => {
    myRay.measure();
    usleep(200);
    myRay.measure();
    usleep(200);
    myRay.measure();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('measures the execution time of named stopwatches', async () => {
    myRay.measure('first');
    usleep(200);
    myRay.measure('first');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('gets the node runtime info', async () => {
    myRay.nodeinfo();

    expect(client.sentPayloads()).toMatchSnapshot();
});
