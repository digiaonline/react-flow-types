// @flow
import React from 'react';
import type {
  FunctionalComponent,
  ClassComponent,
  HigherOrderComponent,
  Component,
  Element,
  AnyReactElement,
  ReactChildren,
} from '../index';

// This is a valid functional react component that we'll use to test our HigherOrderComponents later
const ValidFunctionalComponent = (props: {string1: string, number1: number}) => <div />;

// This is an invalid functional component. HigherOrderComponents shouldn't accept this as input
const InvalidFunctionalComponent = (props: {string1: string, number1: number}) => 'hi';

// Let's test them both:
(function(){
  // This should pass:
  <ValidFunctionalComponent string1="string" number1={10} />;

  // $FlowExpectError
  <ValidFunctionalComponent string1="string" number1="string" />;

  // $FlowExpectError
  <InvalidFunctionalComponent string1="string" number1={10} />;
})();

// Now we can test FunctionalComponent:
(function(){
  // If FunctionalComponent is correctly defined, then this should pass:
  (function<Props>(a: FunctionalComponent<Props>){})(ValidFunctionalComponent);

  // ... and so should this:
  (function(a: FunctionalComponent<{string1: string, number1: number}>){})(ValidFunctionalComponent);

  // ... but this should fail: (commenting out, because error shows up in the wrong locaiton. That's a bug with flow)
  // (function(a: FunctionalComponent<any>){})(InvalidFunctionalComponent);
})();

// This is a valid class-based component. We'll use it to test HigherOrderComponents later
class ValidClassComponent extends React.Component<{number1: number}, {string1: string, number1: number}, void> {
  static defaultProps = {number1: 10}

  render() {
    return <div />;
  }
};

// Let's test it:
(function(){
  // This should pass:
  <ValidClassComponent string1="string" />;

  // $FlowExpectError
  <ValidClassComponent strig1={10} />;
})();

// Now we can test ClassComponent
(function(){
  // This should pass:
  (function(a: ClassComponent<any, {string1: string, number1: number}, any>){})(ValidClassComponent);

  // $FlowExpectError
  (function(a: ClassComponent<any, {string1: string, number1: string}, any>){})(ValidClassComponent);

  // $FlowExpectError
  (function(a: ClassComponent<any, {string1: string, number1: string}, any>){})(ValidFunctionalComponent);
})();

// Tests for Component:
(function(){
  // Should pass:
  (function(a: Component<{string1: string, number1: number}>){})(ValidClassComponent);
  (function(a: Component<{string1: string, number1: number}>){})(ValidFunctionalComponent);

  // Should fail: $FlowExpectError
  (function(a: Component<{string1: string}>){})(ValidFunctionalComponent);

  // $FlowExpectError
  (function(a: Component<{string1: string}>){})(ValidClassComponent);
})();

// Tests for Element:
(function(){
  (<div />: Element<any>);
  (<ValidFunctionalComponent string1="string" number1={10} />: Element<any>);
})();

// Tests for AnyReactElement
(function(){
  ((<div />): AnyReactElement);
  ((null): AnyReactElement);
  // $FlowExpectError
  (('string'): AnyReactElement);
})();

// Tests for ReactChildren
(function(){
  ((<div />): ReactChildren);
  (([<div />]): ReactChildren);

  ((null): ReactChildren);
  (([null]): ReactChildren);

  (('string'): ReactChildren);
  // $FlowExpectError
  ((['string']): ReactChildren);

  ((10): ReactChildren);

  // $FlowExpectError
  (({}): ReactChildren);
})();

// Now, the tests for HigherOrderComponent:
(function() {
  // Let's start with only the ProvidedProps part:
  declare var provideString1: HigherOrderComponent<{}, {string1: string}>;

  (function(){
    // ... and test it with our functional component:
    const ProvideString1OfValidFunctionalComponent = provideString1(ValidFunctionalComponent);

    // should pass:
    (<ProvideString1OfValidFunctionalComponent number1={10} />: Element<any>);
  })();

  (function(){
    // Now with the class-based component:
    const ProvideString1OfValidClassComponent = provideString1(ValidClassComponent);

    // should pass:
    (<ProvideString1OfValidClassComponent />: Element<any>);
  })();

  // now both ProvidedProps and RequiredProps:
  declare var provideString1AndRequireObject1: HigherOrderComponent<{object1: Object}, {string1: string}>;

  (function(){
    // with the functional component:
    const ProvideString1AndRequireObject1OfValidFunctionalComponent = provideString1AndRequireObject1(ValidFunctionalComponent);

    // should pass:
    <ProvideString1AndRequireObject1OfValidFunctionalComponent object1={{}} number1={10} />;

    // $FlowExpectError
    <ProvideString1AndRequireObject1OfValidFunctionalComponent number1={10} />;
  })();

  (function(){
    // with the class component:
    const ProvideString1AndRequireObject1OfValidClassComponent = provideString1AndRequireObject1(ValidClassComponent);

    // should pass:
    <ProvideString1AndRequireObject1OfValidClassComponent object1={{}} />;

    // $FlowExpectError
    <ProvideString1AndRequireObject1OfValidClassComponent number1={10} />;
  })();

  // Composition:
  (function(){
    declare var provideNumber1AndRequireNumber2: HigherOrderComponent<{number2: number}, {}>;
    declare var requireNumber3: HigherOrderComponent<{number3: number}, {}>;
    const ComposedComponent = provideString1(provideNumber1AndRequireNumber2(requireNumber3(ValidFunctionalComponent)));

    <ComposedComponent number1={1} number2={1} number3={1} />;
    // $FlowExpectError
    <ComposedComponent number2={1} number3={1} />;
    // $FlowExpectError
    <ComposedComponent number1={1} number3={1} />;
    // $FlowExpectError
    <ComposedComponent number1={1} number2={1} />;
  })();
})();