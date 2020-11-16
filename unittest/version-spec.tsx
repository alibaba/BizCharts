import { VERSION } from '../src/core';
import packageJson from '../package.json';

// 全局变量中的版本号是否和 package.json 中的一致
describe('version', () => {
  it('should equal package.json', () => {
    expect(
      packageJson.version
    ).toEqual(VERSION)
  });
})
