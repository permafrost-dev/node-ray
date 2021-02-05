import { add } from '../src/index';

test('two plus two is four', () => {
    expect(2 + 2).toBe(4);
});

test('adding two plus two is four', () => {
    expect(add(2, 2)).toBe(4);
});
