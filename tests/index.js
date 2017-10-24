// @flow
import * as React from 'react';
import type {
  HigherOrderComponent,
  ClassComponentWithDefaultProps,
} from '../index';
import InvalidFunctionalComponent from './fixtures/InvalidFunctionalComponent';
import ValidClassComponent from './fixtures/ValidClassComponent';
import ValidFunctionalComponent from './fixtures/ValidFunctionalComponent';
import TestClassComponent from './fixtures/TestClassComponent';
import TestFunctionalComponent from './fixtures/TestFunctionalComponent';
import injectFooFactoryFunctionalComponent from './fixtures/injectFooFactoryFunctionalComponent';
import injectFooHocFunctionalComponent from './fixtures/injectFooHocFunctionalComponent';
import injectFooFactoryClassComponent from './fixtures/injectFooFactoryClassComponent';
import injectFooHocClassComponent from './fixtures/injectFooHocClassComponent';


// tests for ClassComponentWithDefaultProps
(function(){
  // should pass
  (ValidClassComponent: ClassComponentWithDefaultProps<{number1: number}, {string1: string, number1: number}, void>);

  // $FlowExpectError
  (ValidClassComponent: ClassComponentWithDefaultProps<{number1: string}, {string1: string, number1: number}, void>);

  // $FlowExpectError
  (ValidClassComponent: ClassComponentWithDefaultProps<{}, {string1: string, number1: number}, void>);

  // $FlowExpectError
  (ValidClassComponent: ClassComponentWithDefaultProps<{number1: number}, {number1: number}, void>);

  (class extends React.PureComponent<{b: string}, {c: string}> {static defaultProps = {a: 'foo'}} :ClassComponentWithDefaultProps<{a: string}, {b: string}, {c: string}>)
})();

// Now, the tests for HigherOrderComponent:
(function() {
  // Let's start with only the ProvidedProps part:
  declare var provideString1: HigherOrderComponent<{}, {string1: string}>;

  (function(){
    // ... and test it with our functional component:
    const ProvideString1OfValidFunctionalComponent = provideString1(ValidFunctionalComponent);

    // should pass:
    (<ProvideString1OfValidFunctionalComponent number1={10} />: React.Element<any>);
  })();

  (function(){
    // Now with the class-based component:
    const ProvideString1OfValidClassComponent = provideString1(ValidClassComponent);

    // should pass:
    (<ProvideString1OfValidClassComponent />: React.Element<any>);

    // $FlowExpectError
    (<ProvideString1OfValidClassComponent number1="foo" />: React.Element<any>);
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
    <ProvideString1AndRequireObject1OfValidClassComponent />;
  })();

  // Composition:
  (function(){
    declare var provideNumber1AndRequireNumber2: HigherOrderComponent<{number2: number}, {number1: number}>;
    declare var requireNumber3: HigherOrderComponent<{number3: number}, {}>;
    const ComposedComponent = provideString1(provideNumber1AndRequireNumber2(requireNumber3(ValidFunctionalComponent)));

    <ComposedComponent number2={1} number3={1} />;

    // $FlowExpectError
    <ComposedComponent number2={1} number3={1} number1="hi" />;
    // $FlowExpectError
    <ComposedComponent number1={1} number3={1} />;
    // $FlowExpectError
    <ComposedComponent number1={1} number2={1} />;

    // using ramda's compose:
    type FN<A,R> = (a: A) => R;
    declare var compose:
      ((end: void) => (<T>(x: T) => T)) &
      (<A,B>(m1: FN<A,B>, end: void) => FN<A,B>) &
      (<A,B,C>(m1: FN<B,C>, m2: FN<A,B>, end: void) => FN<A,C>) &
      (<A,B,C,D>(m1: FN<C,D>, m2: FN<B,C>, m3: FN<A,B>, end: void) => FN<A,D>) &
      (<A,B,C,D,E>(m1: FN<D,E>, m2: FN<C,D>, m3: FN<B,C>, m4: FN<A,B>, end: void) => FN<A,E>) &
      (<A,B,C,D,E,F>(m1: FN<E,F>, m2: FN<D,E>, m3: FN<C,D>, m4: FN<B,C>, m5: FN<A,B>, end: void) => FN<A,F>) &
      (<A,B,C,D,E,F,G>(m1: FN<F,G>, m2: FN<E,F>, m3: FN<D,E>, m4: FN<C,D>, m5: FN<B,C>, m6: FN<A,B>, end: void) => FN<A,G>) &
      (<A,B,C,D,E,F,G,H>(m1: FN<G,H>, m2: FN<F,G>, m3: FN<E,F>, m4: FN<D,E>, m5: FN<C,D>, m6: FN<B,C>, m7: FN<A,B>, end: void) => FN<A,H>) &
      (<A,B,C,D,E,F,G,H,J>(m1: FN<G,J>, m2: FN<G,H>, m3: FN<F,G>, m4: FN<E,F>, m5: FN<D,E>, m6: FN<C,D>, m7: FN<B,C>, m8: FN<A,B>, end: void) => FN<A,J>) &
      (<A,B,C,D,E,F,G,H,J,K>(m1: FN<J,K>, m2: FN<G,J>, m3: FN<G,H>, m4: FN<F,G>, m5: FN<E,F>, m6: FN<D,E>, m7: FN<C,D>, m8: FN<B,C>, m9: FN<A,B>, end: void) => FN<A,K>) &
      (<A,B,C,D,E,F,G,H,J,K,L>(m1: FN<K,L>, m2: FN<J,K>, m3: FN<G,J>, m4: FN<G,H>, m5: FN<F,G>, m6: FN<E,F>, m7: FN<D,E>, m8: FN<C,D>, m9: FN<B,C>, m10: FN<A,B>, end: void) => FN<A,L>) &
      (<A,R>(...funcs: Array<FN<A,R>>) => FN<A,R>);

      const ComposedComponent2 = compose(
        requireNumber3,
        provideNumber1AndRequireNumber2,
        provideString1,
      )(ValidFunctionalComponent);

      <ComposedComponent2 number1={1} number2={1} number3={1} />;

      <ComposedComponent2 number2={1} number3={1} />;

      // $FlowExpectError
      <ComposedComponent2 number1={1} number3={1} />;
      // $FlowExpectError
      <ComposedComponent2 number1={1} number2={1} />;
  })();
})();


// -----------------------------------
// target: TestClassComponent
const InjectedFooClassFactoryFunctionalComponent = injectFooFactoryFunctionalComponent(TestClassComponent);
<InjectedFooClassFactoryFunctionalComponent baz={10} />;
// $FlowExpectError
<InjectedFooClassFactoryFunctionalComponent foo="asdf" bar={3} baz={10} />;


const InjectedFooClassHocFunctional = injectFooHocFunctionalComponent()(TestClassComponent);
<InjectedFooClassHocFunctional baz={10} />;
// $FlowExpectError
<InjectedFooClassHocFunctional foo="asdf" bar={3} baz={10} />;


const InjectedFooClassFactoryClassComponent = injectFooFactoryClassComponent(TestClassComponent);
<InjectedFooClassFactoryClassComponent baz={10} />;
// $FlowExpectError
<InjectedFooClassFactoryClassComponent foo="asdf" bar={3} baz={10} />;


const InjectedFooClassHocClassComponent = injectFooHocClassComponent({foo: 'bar'})(TestClassComponent);
<InjectedFooClassHocClassComponent baz={10} />;
// $FlowExpectError
<InjectedFooClassHocClassComponent foo="asdf" bar={3} baz={10} />;


// -----------------------------------
// target: TestFunctionalComponent
const InjectedFooFunctionFactoryFunctionalComponent = injectFooFactoryFunctionalComponent(TestFunctionalComponent);
<InjectedFooFunctionFactoryFunctionalComponent baz={10} />;
// $FlowExpectError
<InjectedFooFunctionFactoryFunctionalComponent foo="asdf" bar={3} baz={10} />;


const InjectedFooFunctionHocFunctional = injectFooHocFunctionalComponent()(TestFunctionalComponent);
<InjectedFooFunctionHocFunctional baz={10} />;
// $FlowExpectError
<InjectedFooFunctionHocFunctional foo="asdf" bar={3} baz={10} />;


const InjectedFooFunctionFactoryClassComponent = injectFooFactoryClassComponent(TestFunctionalComponent);
<InjectedFooFunctionFactoryClassComponent baz={10} />;
// $FlowExpectError
<InjectedFooFunctionFactoryClassComponent foo="asdf" bar={3} baz={10} />;


const InjectedFooFunctionHocClassComponent = injectFooHocClassComponent({foo: 'bar'})(TestFunctionalComponent);
<InjectedFooFunctionHocClassComponent baz={10} />;
// $FlowExpectError
<InjectedFooFunctionHocClassComponent foo="asdf" bar={3} baz={10} />;