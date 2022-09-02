/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { FakeClient } from './TestClasses/FakeClient';
//import { Ray as NodeRay } from './../src/RayNode';
import { Ray } from './../src/Ray';
import { NullPayload } from './../src/Payloads/NullPayload';
import { Request } from './../src/Request';
import { end, usleep } from '../src/lib/utils';
import { Hostname } from '../src/Origin/Hostname';

type BaseRay = Ray;

let client: FakeClient, myRay: Ray, myBaseRay: Ray;

function getNewRay(): Ray {
    const result = Ray.create(client, 'fakeUuid');

    result.clearCounters();
    result.rateLimiter().clear();

    return result;
}

beforeEach(() => {
    Hostname.set('fake-hostname');

    // NodeRay.defaultSettings = {
    //     enable: true,
    //     host: 'localhost',
    //     port: 23510,
    //     local_path: null,
    //     remote_path: null,
    //     always_send_raw_values: false,
    //     not_defined: false,
    // };

    Ray.defaultSettings = {
        enable: true,
        host: 'localhost',
        port: 23510,
        local_path: null,
        remote_path: null,
        always_send_raw_values: false,
        not_defined: false,
    };

    client = new FakeClient();
    myRay = Ray.create(client, 'fakeUuid');
    myBaseRay = Ray.create(client, 'fakeUuid');
    myRay.clearCounters();
    myBaseRay.clearCounters();
    myRay.rateLimiter().clear();
});

it('allows setting the url scheme to https', () => {
    client = new FakeClient(3000, 'otherhost', 'https');
    myRay = Ray.create(client, 'fakeUuid');

    myRay.send('test https request');

    expect(client.requestedUrls()[0]).toContain('https://');
    expect(client.requestedUrls()).toMatchSnapshot();
});

it('allows defaults to the http url scheme', () => {
    myRay.send('test http request');

    expect(client.requestedUrls()[0]).toContain('http://');
    expect(client.requestedUrls()).toMatchSnapshot();
});

it('sends the ray ban payload', () => {
    myRay.ban();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends the ray charles payload', () => {
    myRay.charles();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a color payload', () => {
    myRay.color('red');
    myRay.green().orange().red().purple().blue().gray();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a label payload', () => {
    myRay.label('test-123');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a size payload', () => {
    myRay.size('lg');
    myRay.small().large();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a new screen payload', () => {
    myRay.newScreen('test 1');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a clear screen payload', () => {
    myRay.clearScreen();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a clear all payload', () => {
    myRay.clearAll();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a confetti payload', () => {
    myRay.confetti();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends an html payload', () => {
    myRay.html('<em>test</em>');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it("doesn't blow up when calling html without a value", () => {
    myRay.html('');
    myRay.html();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a text payload', () => {
    myRay.text('test 1');
    myRay.text('<em>test 2</em>');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends an image payload', () => {
    myBaseRay.image('http://localhost/test.png');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends an xml payload', () => {
    myRay.xml('<root><abc>1</abc></root>');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a json string payload', () => {
    myRay.json('{"A": 123}');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends an object as json payload', () => {
    myRay.toJson(JSON.stringify({ a: 1, b: 2 }));

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a classname payload', () => {
    myRay.className(myRay);

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a notify payload', () => {
    myRay.notify('hello world');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a date payload', () => {
    myRay.date(new Date('2018-04-04T16:00:00.000Z'));
    // @ts-ignore
    myRay.date(null);

    expect(client.sentPayloads()[0].payloads[0].content.formatted.split(' ')[0]).toBe('2018-04-04');
    expect(client.sentPayloads()[0].payloads[0].content.timestamp).toBe(1522857600);

    expect(client.sentPayloads()[1].payloads[0].content.formatted).toBe(null);
    expect(client.sentPayloads()[1].payloads[0].content.timestamp).toBe(null);
});

it('sends an error payload', () => {
    myRay.error(new Error('test error'));

    expect(client.sentPayloads()).toMatchSnapshot();
});

/*it('sends a file payload', () =>
{
    myRay.file(__dirname + '/TestData/test.txt');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a missing file payload', () =>
{
    myRay.file('missing.txt');

    expect(client.sentPayloads()).toMatchSnapshot();
});
*/

it('can convert a payload to JSON', () => {
    const payload = new NullPayload();

    expect(JSON.parse(payload.toJson()).content.label).toBe('Null');
    expect(JSON.parse(payload.toJson()).content.content).toBe(null);
});

it('can replace the remote path with the local path', () => {
    const payload = new NullPayload();
    payload.remotePath = '/app/files';
    payload.localPath = '/code/packages';

    const replaced1 = payload.replaceRemotePathWithLocalPath('/app/files/app/test.txt');
    const replaced2 = payload.replaceRemotePathWithLocalPath('/app/files/abc');
    const replaced3 = payload.replaceRemotePathWithLocalPath('/other/app/abc');

    expect(replaced1).toBe('/code/packages/app/test.txt');
    expect(replaced2).toBe('/code/packages/abc');
    expect(replaced3).toBe('/other/app/abc');
});

it('sends a raw payload', () => {
    myRay.raw('one', 'two');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it("doesn't blow up when calling raw without any arguments", () => {
    myRay.raw();

    expect(client.sentPayloads().length).toBe(0);
});

it("doesn't blow up when calling send without any arguments", () => {
    myRay.send();

    expect(client.sentPayloads().length).toBe(0);
});

it('sends a payload and returns the value', () => {
    const value: any = myRay.pass('test');

    expect(client.sentPayloads().length).toBe(1);
    expect(value).toBe('test');
});

it('sends show and hide app payloads', () => {
    myRay.showApp();
    myRay.hideApp();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('conditionally shows a payload', () => {
    myRay.showIf(true);
    myRay.showIf(false);
    myRay.showIf(() => true);

    myRay.showWhen(true);
    myRay.showWhen(false);
    myRay.showWhen(() => true);

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a null payload', () => {
    myRay.send(null);

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a boolean payload', () => {
    myRay.send(true);

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a string payload', () => {
    myRay.send('test');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a hide payload', () => {
    myRay.hide();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a remove payload', () => {
    myRay.remove();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a remove payload conditionally', () => {
    myRay.removeIf(true);
    myRay.removeIf(false);
    myRay.removeWhen(true);
    myRay.removeWhen(false);
    myRay.removeWhen(() => false);

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a table payload', () => {
    myRay.table([1, 2, { A: 1 }, myRay, true, null], 'table');
    myRay.table([[3, 4], { B: 2 }, false]);
    myRay.table({ message: 'hello world', counter: 123 });
    myRay.table({ name: 'test', value: 987 }, 'Test');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a custom payload', () => {
    myRay.sendCustom('test 123', 'test');
    myRay.sendCustom('test 4');
    myRay.sendCustom('test 5', undefined);
    myRay.sendCustom('test 5', '');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('can be disabled', () => {
    myRay.html('<em>sent</em>');
    myRay.disable();
    myRay.html('<em>not sent</em>');

    expect(client.sentPayloads().length).toBe(1);
});

it('returns the correct enabled state', () => {
    myRay.disable();

    expect(myRay.enabled()).toBe(false);
    expect(myRay.disabled()).toBe(true);

    myRay.enable();
    expect(myRay.enabled()).toBe(true);
    expect(myRay.disabled()).toBe(false);
});

it('returns the correct enabled state when using the enabled_callback setting', () => {
    myRay.enable();
    myRay.settings.enabled_callback = () => false;

    expect(myRay.enabled()).toBe(false);
    expect(myRay.disabled()).toBe(true);

    myRay.settings.enabled_callback = () => true;

    expect(myRay.enabled()).toBe(true);
    expect(myRay.disabled()).toBe(false);

    myRay.disable();
    myRay.settings.enabled_callback = () => false;

    expect(myRay.enabled()).toBe(false);
    expect(myRay.disabled()).toBe(true);
});

it('counts the number of times a piece of code is called', () => {
    for (let i = 0; i < 2; i++) {
        myRay.count('first');

        for (let j = 0; j < 2; j++) {
            myRay.count('first');
            myRay.count('second');
        }
    }

    expect(Ray.counters.get('first')).toBe(6);
    expect(Ray.counters.get('second')).toBe(4);
});

// function myFunc1(r: any) {
//     r.count();
// }

// function myFunc2(r: any) {
//     r.count();
// }

it('counts the number of times an unnamed piece of code is called', () => {
    myRay.enable();

    for (let i = 0; i < 2; i++) {
        myRay.count();

        for (let j = 0; j < 2; j++) {
            myRay.count();
        }
    }

    let counter = 0;

    for (const prop in Ray.counters.getCounters()) {
        if (counter === 0) {
            expect(end(Ray.counters.getCounters()[prop])).toBe(2);
        }
        if (counter === 1) {
            expect(end(Ray.counters.getCounters()[prop])).toBe(4);
        }
        counter++;
    }

    //expect(client.sentPayloads()[3].payloads[0].content.content).toBe('Called 2 times.'); // myFunc1
    //expect(client.sentPayloads()[5].payloads[0].content.content).toBe('Called 4 times.'); // myFunc2
});

it('returns zero for an unknown named counter value', () => {
    expect(Ray.counters.get('missing')).toBe(0);
});

it('clears all counters', () => {
    myRay.count('first');
    myRay.count('first');
    myRay.count('second');

    expect(Ray.counters.get('first')).toBe(2);
    expect(Ray.counters.get('second')).toBe(1);

    myRay.clearCounters();

    expect(Ray.counters.get('first')).toBe(0);
    expect(Ray.counters.get('second')).toBe(0);
});

it('can transform a request into JSON', () => {
    const req = new Request('1-2-3-4', [], [{ test_version: 1.0 }]);

    expect(req.toJson()).toMatchSnapshot();
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

it('removes named stopwatches', () => {
    myRay.measure('mytimer');
    expect(Ray.stopWatches.mytimer).not.toBeUndefined();
    myRay.stopTime('mytimer');
    expect(Ray.stopWatches.mytimer).toBeUndefined();
});

it('removes all stopwatches', () => {
    myRay.measure('mytimer1');
    myRay.measure('mytimer2');
    expect(Ray.stopWatches.mytimer1).not.toBeUndefined();
    expect(Ray.stopWatches.mytimer2).not.toBeUndefined();
    myRay.stopTime();
    expect(JSON.stringify(Ray.stopWatches)).toBe('{}');
});

it('pauses code execution', async () => {
    await myRay.pause();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends an html payload when calling ray() with an object argument', () => {
    myRay.send({ A: 123, B: [4, 5, 6] });

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends an exception payload', () => {
    let err;
    try {
        err = new Error('test');
        throw err;
    } catch (e) {
        err = e;
    }

    myRay.exception(err, {});

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends an exception payload with metadata', () => {
    let err;

    try {
        err = new Error('test');
        throw err;
    } catch (e) {
        err = e;
    }

    myRay.exception(err, { one: 1, ten: 10, twentyThree: 23 });

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends an event payload', () => {
    myRay.event('testevent', []);

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a caller payload', () => {
    const func1 = () => {
        myRay.caller();
    };

    const func2 = () => {
        func1();
    };

    func2();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('allows setting macro functions', () => {
    const testOneCalls: any[] = [];

    myRay.macro('testOne', function (a: any) {
        testOneCalls.push(a);

        // @ts-ignore
        return this;
    });

    expect(myRay.testOne(1)).toBe(myRay);
    expect(testOneCalls.length).toStrictEqual(1);
    expect(testOneCalls[0]).toBe(1);
});

it('calls the sending payload callback before sending payloads', () => {
    let callbackFired = false;

    myRay.settings.sending_payload_callback = r => {
        callbackFired = true;
    };

    expect(callbackFired).toBeFalsy();

    myRay.html('<strong>test</strong>');

    expect(callbackFired).toBeTruthy();
});

it('can send payloads from the sending payload callback', () => {
    myRay.settings.sending_payload_callback = r => {
        r.html('sent before the main payload');
    };

    myRay.html('<strong>test</strong>');

    expect(client.sentPayloads().length).toBe(2);
    expect(client.sentPayloads()[0].payloads[0].content.content).toBe('sent before the main payload');
    expect(client.sentPayloads()).toMatchSnapshot();
});

it('can modify payloads from the sending payload callback', () => {
    myRay.settings.sending_payload_callback = (r, p) => {
        // @ts-ignore
        p[0].date = new Date('2020-01-01T16:00:00.000Z');
    };

    myRay.date(new Date('2018-04-04T16:00:00.000Z'));

    expect(client.sentPayloads()[0].payloads[0].content.formatted.split(' ')[0]).toBe('2020-01-01');
});

it('calls the sent payload callback', () => {
    let callbackFired = false;

    myRay.settings.sent_payload_callback = r => {
        callbackFired = true;
    };

    expect(callbackFired).toBeFalsy();

    myRay.html('<strong>test</strong>');

    expect(callbackFired).toBeTruthy();
});

it('can send additional payloads from the sent payload callback', () => {
    myRay.settings.sent_payload_callback = r => {
        r.purple();
    };

    myRay.html('<strong>test</strong>');

    expect(client.sentPayloads().length).toBe(2);
    expect(client.sentPayloads()).toMatchSnapshot();
});

it('cannot call when rate limit max has been reached', () => {
    myRay.rateLimiter().clear().max(1);

    myRay.text('this can pass');
    myRay.text('this cannot pass, but triggers a warning call');
    myRay.text('this cannot pass');

    expect(client.sentPayloads().length).toBe(2);
    expect(client.sentPayloads()[1]['payloads'][0]['content']['content']).toBe('Rate limit has been reached...');
});

it('can limit the number of payloads sent from a loop', () => {
    const limit = 5;

    for (let i = 0; i < 10; i++) {
        getNewRay().limit(limit).send(`limited loop iteration ${i}`);
    }

    expect(client.sentPayloads().length).toBe(limit);
});

it('only limits the number of payloads sent from the line that calls limit', () => {
    const limit = 5;
    const iterations = 10;

    for (let i = 0; i < iterations; i++) {
        getNewRay().limit(limit).send(`limited loop iteration ${i}`);
        getNewRay().send(`unlimited loop iteration ${i}`);
    }

    expect(client.sentPayloads().length).toBe(limit + iterations);
});

it('can handle multiple consecutive calls to limit', () => {
    const limit = 2;

    for (let i = 0; i < 10; i++) {
        getNewRay().limit(limit).send(`limited loop A iteration ${i}`);

        getNewRay().limit(limit).send(`limited loop B iteration ${i}`);
    }

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a payload once when called with arguments', () => {
    for (let i = 0; i < 5; i++) {
        getNewRay().once(i);
    }

    expect(client.sentPayloads().length).toBe(1);
    expect(client.sentPayloads()[0]['payloads'][0]['content']['values']).toStrictEqual([0]);
});

it('sends a payload once when called without arguments', () => {
    for (let i = 0; i < 5; i++) {
        getNewRay().once().text(`${i}`);
    }

    expect(client.sentPayloads().length).toBe(1);
    expect(client.sentPayloads()[0]['payloads'][0]['content']['content']).toStrictEqual('0');
});

it('sends a payload once while allowing calls to limit', () => {
    for (let i = 0; i < 5; i++) {
        getNewRay().once(i);
        getNewRay().limit(5).text(`${i}`);
    }

    expect(client.sentPayloads().length).toBe(6);
});

it('can conditionally send payloads using if with a truthy conditional and without a callback', () => {
    for (let i = 0; i < 10; i++) {
        getNewRay()
            .if(i < 5)
            .text(`value: ${i}`);
    }

    expect(client.sentPayloads().length).toBe(5);
});

it('can conditionally send payloads using if with a callable conditional param', () => {
    for (let i = 0; i < 10; i++) {
        getNewRay()
            .if(() => i < 5)
            .text(`value: ${i}`);
    }

    expect(client.sentPayloads().length).toBe(5);
});

it('can conditionally send payloads using if with a callback', () => {
    getNewRay().if(true, function ($ray) {
        $ray.text('one');
    });

    getNewRay().if(false, function ($ray) {
        $ray.text('two');
    });

    expect(client.sentPayloads().length).toBe(1);
});

it('can chain method calls when using if with a callback and a false condition', () => {
    getNewRay()
        .if(false, ray => ray.text('one').green())
        .text('two')
        .blue();

    getNewRay()
        .text('three')
        .if(false, ray => ray.green());

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('can chain multiple if calls with callbacks together', () => {
    getNewRay()
        .text('test')
        .if(true, function (ray) {
            ray.green();
        })
        .if(false, function (ray) {
            ray.text('text modified');
        })
        .if(true, function (ray) {
            ray.large();
        })
        .hide();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a separator payload', () => {
    myRay.separator();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a screen color payload', () => {
    myRay.screenColor('red');
    myRay.screenColor('green');

    expect(client.sentPayloads()).toMatchSnapshot();
});
