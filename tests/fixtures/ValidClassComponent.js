// @flow
import * as React from 'react';

// This is a valid class-based component. We'll use it to test HigherOrderComponents later
class ValidClassComponent extends React.Component<{string1: string, number1: number}, void> {
  static defaultProps = {number1: 10}

  render() {
    return <div />;
  }
};

export default ValidClassComponent;