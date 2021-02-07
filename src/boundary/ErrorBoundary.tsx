import React from 'react';
import { ErrorBoundary } from 'react-error-boundary';
export interface ErrorBoundaryProps {
  onResetKeysChange?: (prevResetKeys: Array<any>, resetKeys: Array<any>) => void
  onReset?: () => void
  onError?: (error: Error, info: { componentStack: string }) => void
  resetKeys?: Array<any>
  fallback?: React.ReactElement<any, any> | null
  [key:string]:any
}


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

export default ErrorBoundary;
