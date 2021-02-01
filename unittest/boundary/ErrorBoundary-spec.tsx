import React, { useEffect, useState } from 'react';
import {Chart} from '../../src';
import Line from '../../src/geometry/Line';
import Effects from '../../src/components/Effects';
import { setDefaultErrorFallback } from '../../src/core';
import { render, act, cleanup, fireEvent, screen } from '@testing-library/react';
import { getClientPoint } from '../tools/simulate';

// throw new Error 会阻止单测
describe('ErrorBoundary', () => {
  // test('Chart-ErrorBoundary', () => {
  //   const { container } = render(<Chart height={50} width={500}>
  //     <Effects>
  //     {
  //       (() => {throw new Error('Chart-ErrorBoundary unnit test')})
  //     }
  //     </Effects>
  //   </Chart>)
  //   expect(container).toMatchSnapshot();
  // });
  // test('CustChartErrorBoundary', () => {
  //   setDefaultErrorFallback(() => <div>cust Chart-ErrorBoundary</div>)
  //   const { container } = render(<Chart height={50} width={500}>
  //     <Effects>
  //     {
  //       (() => {throw new Error('Chart-ErrorBoundary unnit test')})
  //     }
  //     </Effects>
  //   </Chart>)
  //   // expect(container).toMatchSnapshot();
  // });
  test('Chart-ErrorBoundary', () => {
    // render(<Chart height={200} width={500} data={[{x: 1, y:1}, {x:2, y:2}]} scale={{x: { formatter: d => { return w.e.x }}}} >
    //   <Line position="x*y" />
    // </Chart>)
    render(<Chart height={200} width={500} data={[{x: 1, y:1}, {x:2, y:2}]} scale={{x: {}}} >
      <Line position="x*y" />
    </Chart>)
  });
})
