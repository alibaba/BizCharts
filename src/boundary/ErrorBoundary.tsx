import React from 'react';
import { ErrorBoundary, ErrorBoundaryProps } from 'react-error-boundary';


let DefaultErrorFallback = ({ error }) => {
  return (
    <div className="bizcharts-error" role="alert">
      <p>BizCharts something went wrong:</p>
      <pre>{error.message}</pre>
    </div>
  )
};

export function ErrorFallback(args) {
  return DefaultErrorFallback(args);
}

export const setDefaultErrorFallback = (CustComponents) => {
  DefaultErrorFallback = CustComponents;
}

export { ErrorBoundaryProps };

export default ErrorBoundary;
