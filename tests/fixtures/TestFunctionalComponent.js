// @flow
import * as React from 'react';
import type { ComponentWithDefaultProps } from '../../index';

export type Props = {
  foo: number,
  bar: number,
  baz: number,
};

const TestFunctionalComponent = (props: Props) => { return null; };

TestFunctionalComponent.defaultProps = {
  foo: 3,
  bar: 3,
};

export default (TestFunctionalComponent: ComponentWithDefaultProps<{foo: number, bar: number}, Props>);
