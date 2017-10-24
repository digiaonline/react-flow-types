// @flow
import * as React from 'react';

export type Props = {
  foo: number,
  bar: number,
  baz: number,
};

class TestClassComponent extends React.Component<Props, void> {
  static defaultProps = {
    foo: 3,
    bar: 3,
  };
  render = () => null;
};

export default TestClassComponent;