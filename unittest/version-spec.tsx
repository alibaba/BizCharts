import shallowEqual from '../src/utils/shallowEqual';
import { VERSION } from '../src/core';
import packageJson from '../package.json';

describe('version', () => {
  it('should equal package.json', () => {
    const data = [{x:1,y:1}];
    expect(
      packageJson.version
    ).toEqual(VERSION)
  });
})
