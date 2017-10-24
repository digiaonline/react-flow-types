// @flow
import * as React from 'react';
import type {
  HigherOrderComponent,
} from '../../index';

type Options = {
  foo: 'bar'
}

type RequiredProps = {};

type ProvidedProps = {foo: number};

const injectFooViaClassComponentWithOptions = (options: Options): HigherOrderComponent<RequiredProps, ProvidedProps> => (C: any): any => {
  class FooInjector extends React.Component<RequiredProps> {
    render() {
      return <C {...this.props} foo={3} />;
    }
  }

  return FooInjector
};

export default injectFooViaClassComponentWithOptions;