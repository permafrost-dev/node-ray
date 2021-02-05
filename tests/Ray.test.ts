/* eslint-disable no-undef */

import { FakeClient } from './TestClasses/FakeClient';
import { Ray } from './../src/Ray';

let client: FakeClient, myRay: Ray;

beforeEach(() =>
{
    client = new FakeClient();
    myRay = Ray.create(client, 'fakeUuid');
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
    myRay.green().blue();

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

it('sends an image payload', () =>
{
    myRay.image('http://localhost/test.png');

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

it('sends a file payload', () =>
{
    myRay.file(__dirname + '/TestData/test.txt');

    expect(client.sentPayloads()).toMatchSnapshot();
});