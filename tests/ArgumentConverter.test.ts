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

// Tests that convertToPrimive returns string value and isHtml property is true when an object or array argument is passed
it('converts json to html without formatting issues', () => {
    const arg = ['foo', 'bar', 123, { A: 123 }, null];
    const result = ArgumentConverter.convertToPrimitive(arg);

    expect(result.value).toBe(
        '<code style="font-size: 0.8rem!important;" class=""><code style="font-size: 0.8rem!important;" class="bold text-gray-500 p-0">&nbsp;<span style="font-size: 0.8rem!important;" class="bold text-orange-400">[</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<code style="font-size: 0.8rem!important;" class="bold text-green-600 p-0">"foo"</code><span style="font-size: 0.8rem!important;" class="bold text-orange-400">,</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<code style="font-size: 0.8rem!important;" class="bold text-green-600 p-0">"bar"</code><span style="font-size: 0.8rem!important;" class="bold text-orange-400">,</span><br>&nbsp;&nbsp;&nbsp;&nbsp;123<span style="font-size: 0.8rem!important;" class="bold text-orange-400">,</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 0.8rem!important;" class="bold text-yellow-600">Object</span>&nbsp;<code style="font-size: 0.8rem!important;" class="text-gray-600"><span style="font-size: 0.8rem!important;" class="bold text-orange-400">{</span><br>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;<code style="font-size: 0.8rem!important;" class="bold text-green-600 p-0">"A"</code><span style="font-size: 0.8rem!important;" class="bold text-orange-400">:&nbsp;</span>123<span style="font-size: 0.8rem!important;" class="bold text-orange-400">,</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 0.8rem!important;" class="bold text-orange-400">}</span></code><span style="font-size: 0.8rem!important;" class="bold text-orange-400">,</span><br>&nbsp;&nbsp;&nbsp;&nbsp;<span style="font-size: 0.8rem!important;" class="bold text-indigo-600">null</span><span style="font-size: 0.8rem!important;" class="bold text-orange-400">,</span><br><span style="font-size: 0.8rem!important;" class="bold text-orange-400">]</span></code></code>',
    );
    expect(result.isHtml).toBe(true);
});
