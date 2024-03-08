/* eslint-disable no-undef */
import { expect, it } from 'vitest';
import { ArgumentConverter } from '@/ArgumentConverter';

// Tests that convertToPrimitive method returns the same string value and isHtml property is false when string argument is passed.
it('converts to primitive with a string argument', () => {
    const str = 'test string';
    const result = ArgumentConverter.convertToPrimitive(str);
    expect(result.value).toBe(str);
    expect(result.isHtml).toBe(false);
});

// Tests that convertToPrimitive method returns the same number value and isHtml property is false when number argument is passed.
it('converts to primitive with a number argument', () => {
    const num = 123;
    const result = ArgumentConverter.convertToPrimitive(num);
    expect(result.value).toBe(num);
    expect(result.isHtml).toBe(false);
});

// Tests that convertToPrimitive method returns the same boolean value and isHtml property is false when boolean argument is passed.
it('convert to primitive with a boolean argument', () => {
    const bool = true;
    const result = ArgumentConverter.convertToPrimitive(bool);
    expect(result.value).toBe(bool);
    expect(result.isHtml).toBe(false);
});

// Tests that convertToPrimitive returns null value and isHtml=false when argument is null.
it('convert to primitive with a null argument', () => {
    const arg = null;
    const result = ArgumentConverter.convertToPrimitive(arg);

    expect(result.value).toBeNull();
    expect(result.isHtml).toBe(false);
});
