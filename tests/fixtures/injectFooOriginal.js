// @flow
import * as React from 'react';
import type {
  HigherOrderComponent,
} from '../../index';
import type { Props } from './TestComponent'

const injectFooOriginal: HigherOrderComponent<{}, {foo: number}> = (C: any): any => {
  return (props: Props) => <C {...props} foo={3} />;
};

export default injectFooOriginal;