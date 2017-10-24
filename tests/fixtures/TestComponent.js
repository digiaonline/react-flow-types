// @flow
import * as React from 'react';

export type Props = {
  foo: number,
  bar: number,
  baz: number,
};

class TestComponent extends React.Component<Props, void> {
  static defaultProps = {
    foo: 3,
    bar: 3,
  };
  render = () => null;
};

export default TestComponent;