import { registerShape, registerTheme, getTheme } from '../../src/core';
// import { registerPlotTheme } from '../../src';


describe('export function', () => {
  it('should export registerShape', () => {
    expect(registerShape).toBeDefined();
  });
  it('should export registerTheme', () => {
    expect(registerTheme).toBeDefined();
  });
  it('should export getTheme', () => {
    expect(getTheme).toBeDefined();
  });
  // it('should export registerPlotTheme', () => {
  //   expect(registerPlotTheme).toBeDefined();
  // });
})

