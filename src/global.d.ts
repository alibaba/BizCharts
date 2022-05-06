import { ReactElement } from 'react';

declare namespace React {
  type Props<T> = {
    children: ReactElement;
  };
}
