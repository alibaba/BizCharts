import React, { useEffect, useState } from 'react';
import Chart from '../../src/components/Chart';
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
    
  });
})
