/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undef */

import { FakeClient } from './TestClasses/FakeClient';
import { ray, Ray } from './../src/RayNode';
import { Ray as BaseRay } from './../src/Ray';
import { NullPayload } from './../src/Payloads/NullPayload';
import { Request } from './../src/Request';

let client: FakeClient, myRay: Ray, myBaseRay: BaseRay;

beforeEach(() =>
{
    client = new FakeClient();
    myRay = Ray.create(client, 'fakeUuid');
    myBaseRay = BaseRay.create(client, 'fakeUuid');

    myRay.clearCounters();
    myBaseRay.clearCounters();
});

it('sends the ray ban payload', () =>
{
    myRay.ban();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends the ray charles payload', () =>
{
    myRay.charles();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a color payload', () =>
{
    myRay.color('red');
    myRay.green().orange().red().purple().blue().gray();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a size payload', () =>
{
    myRay.size('lg');
    myRay.small().large();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a new screen payload', () =>
{
    myRay.newScreen('test 1');

    expect(client.sentPayloads()).toMatchSnapshot();
});


it('sends a clear screen payload', () =>
{
    myRay.clearScreen();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a clear all payload', () =>
{
    myRay.clearAll();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends an html payload', () =>
{
    myRay.html('<em>test</em>');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('doesn\'t blow up when calling html without a value', () =>
{
    myRay.html('');
    myRay.html();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends an image payload', () =>
{
    myBaseRay.image('http://localhost/test.png');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends an xml payload', () =>
{
    myRay.xml('<root><abc>1</abc></root>');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a json string payload', () =>
{
    myRay.json('{"A": 123}');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends an object as json payload', () =>
{
    myRay.toJson(JSON.stringify({ a: 1, b: 2 }));

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a classname payload', () =>
{
    myRay.className(myRay);

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a notify payload', () =>
{
    myRay.notify('hello world');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a date payload', () =>
{
    myRay.date(new Date('2018-04-04T16:00:00.000Z'));
    // @ts-ignore
    myRay.date(null);

    expect(client.sentPayloads()[0].payloads[0].content.formatted).toBe('2018-04-04 12:00:00');
    expect(client.sentPayloads()[0].payloads[0].content.timestamp).toBe(1522857600);

    expect(client.sentPayloads()[1].payloads[0].content.formatted).toBe(null);
    expect(client.sentPayloads()[1].payloads[0].content.timestamp).toBe(null);
});

it('sends an error payload', () =>
{
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

it('can convert a payload to JSON', () =>
{
    const payload = new NullPayload();

    expect(JSON.parse(payload.toJson()).content.label).toBe('Null');
    expect(JSON.parse(payload.toJson()).content.content).toBe(null);
});

it('can replace the remote path with the local path', () =>
{
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

it('sends a raw payload', () =>
{
    myRay.raw('one', 'two');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('doesn\'t blow up when calling raw without any arguments', () =>
{
    myRay.raw();

    expect(client.sentPayloads().length).toBe(0);
});

it('doesn\'t blow up when calling send without any arguments', () =>
{
    myRay.send();

    expect(client.sentPayloads().length).toBe(0);
});


it('sends a payload and returns the value', () =>
{
    const value: any = myRay.pass('test');

    expect(client.sentPayloads().length).toBe(1);
    expect(value).toBe('test');
});

it('sends show and hide app payloads', () =>
{
    myRay.showApp();
    myRay.hideApp();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('conditionally shows a payload', () =>
{
    myRay.showIf(true);
    myRay.showIf(false);
    myRay.showIf(() => true);

    myRay.showWhen(true);
    myRay.showWhen(false);
    myRay.showWhen(() => true);

    expect(client.sentPayloads()).toMatchSnapshot();
});


it('sends a null payload', () =>
{
    myRay.send(null);

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a boolean payload', () =>
{
    myRay.send(true);

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a string payload', () =>
{
    myRay.send('test');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a hide payload', () =>
{
    myRay.hide();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a remove payload', () =>
{
    myRay.remove();

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a remove payload conditionally', () =>
{
    myRay.removeIf(true);
    myRay.removeIf(false);
    myRay.removeWhen(true);
    myRay.removeWhen(false);
    myRay.removeWhen(() => false);

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a table payload', () =>
{
    myRay.table([1, 2, { A: 1 }, myRay, true, null], 'table');
    myRay.table([[3, 4], { B: 2 }, false]);

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('sends a custom payload', () =>
{
    myRay.sendCustom('test 123', 'test');
    myRay.sendCustom('test 4');
    myRay.sendCustom('test 5', undefined);
    myRay.sendCustom('test 5', '');

    expect(client.sentPayloads()).toMatchSnapshot();
});

it('can be disabled', () =>
{
    myRay.html('<em>sent</em>');
    myRay.disable();
    myRay.html('<em>not sent</em>');

    expect(client.sentPayloads().length).toBe(1);
});

it('returns the correct enabled state', () =>
{
    myRay.disable();

    expect(myRay.enabled()).toBe(false);
    expect(myRay.disabled()).toBe(true);

    myRay.enable();
    expect(myRay.enabled()).toBe(true);
    expect(myRay.disabled()).toBe(false);
});

it('counts the number of times a piece of code is called', () =>
{
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

function myFunc1()
{
    ray().count();
    return 'test1';
}

function myFunc2()
{
    ray().count();
    return 'test2';
}

it('counts the number of times an unnamed piece of code is called', () =>
{
    for (let i = 0; i < 2; i++) {
        myFunc1();

        for (let j = 0; j < 2; j++) {
            myFunc2();
        }
    }

    expect(client.sentPayloads()[3].payloads[0].content.content).toBe('Called 2 times.'); // myFunc1
    expect(client.sentPayloads()[5].payloads[0].content.content).toBe('Called 4 times.'); // myFunc2
});

it('returns zero for an unknown named counter value', () =>
{
    expect(Ray.counters.get('missing')).toBe(0);
});

it('clears all counters', () =>
{
    myRay.count('first');
    myRay.count('first');
    myRay.count('second');

    expect(Ray.counters.get('first')).toBe(2);
    expect(Ray.counters.get('second')).toBe(1);

    myRay.clearCounters();

    expect(Ray.counters.get('first')).toBe(0);
    expect(Ray.counters.get('second')).toBe(0);
});

it('can transform a request into JSON', () =>
{
    const req = new Request('1-2-3-4', [], [{ test_version: 1.0 }]);

    expect(req.toJson()).toMatchSnapshot();
});
