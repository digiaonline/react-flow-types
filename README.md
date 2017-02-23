# react-types

A small collection of flow type definitions for working with React components.

## Usage

```
$ npm install --save-dev @nordsoftware/react-types
```

```javascript
import type {ReactChildren} from '@nordsoftware/react-types'

export default function MyComponent({children}: {children?: ReactChildren}) =>
  <div>{chlidren}</div>
```

## Most useful types

### `AnyReactElement`

Useful any react element or `void`. Useful when a value should be an optional single element.

Example:

```javascript
import type {AnyReactElement} from '@nordsoftware/react-types'

// `header` and `footer` in this example are optional
export default function Layout({header, footer}: {header: AnyReactElement, footer: AnyReactElement}) =>
  <div>
    <div class="header">{header}</div>
    <div class="footer">{footer}</div>
  </div>
```

### `ReactChildren`

Matches a single `AnyReactElement`, or an arary of them, or a string, or a number. Basically, any value that can be the `children` of a `<div>` will flow into this.

Example:

```javascript
import type {ReactChildren} from '@nordsoftware/react-types'

// `header` and `footer` in this example can be multiple elements, and even strings or numbers
export default function Layout({header, footer}: {header: ReactChildren, footer: ReactChildren}) =>
  <div>
    <div class="header">{header}</div>
    <div class="footer">{footer}</div>
  </div>
```

### `Component<Props>`

Matches any component, whether functional or class-based.

```javascript
import type {Component} from '@nordsoftware/react-types'

class TheComponent extends React.Component {
  props: {n: number}
  render() {
    return <div />
  }
}

const AnotherComponent = () => <div />

const makeElement = (component: Component<{n: number}>) =>
  React.createElement(component, {n: 10})

makeElement(TheComponent)
makeElement(AnotherComponent)
```

### `HOC<RequiredProps, ProvidedProps>`

The generic type of a higher-order component. A `HOC` always *provides* a set of props to the inner component, and *requires* another set of props to be passed to it.

Example:

```javascript
import type {HOC} from '@nordsoftware/react-types'

type RequiredProps = {
  name: string,
}

type ProvidedProps = {
  input: {
    value: mixed,
    onChange: Function,
  },
}

// The hoc:
const asField = (): HOC<{name: string}, ProvidedProps> => (component): any => {
  const FinalComponent = ({name, ...rest}) =>
    <ReduxFormField name={name} component={component} props={rest} />;

  hoistNonReactStatics(FinalComponent, component)

  FinalComponent.displayName =
    `asField(${component.displayName || component.name || 'Component'})`

  return FinalComponent
}

const Input = ({input}) => <input type="text" {...input} />
const WrapperInput = asField(Input)

const element = <WrappedInput name="email" />
```

## Other types

### `Element<Config>`

Matches a valid instance of a react component, also called an element. It's a alias for the global type `React$Element`.

Example:

```javascript
import type {Element} from '@nordsoftware/react-types'

export default function Layout({header, footer}: {header: Element<any>, footer: Element<any>}) =>
  <div>
    <div class="header">{header}</div>
    <div class="footer">{footer}</div>
  </div>
```

### `FunctionalComponent<Props>`

Matches a functional react component.

Example:

```javascript
import type {FunctionalComponent} from '@nordsoftware/react-types'

const TheComponent = () => <div />

const makeElement = (component: FunctionalComponent<{n: number}>) =>
  React.createElement(component, {n: 10})

makeElement(TheComponent)
```

### `ClassComponent<DefaultProps, Props, State>`

An alias for `Class<React$Component<DefaultProps, Props, State>>`, and matches any ES6 class-based react componnet.

Example:

```javascript
import type {ClassComponent} from '@nordsoftware/react-types'

class TheComponent extends React.Component {
  props: {n: number}
  render() {
    return <div />
  }
}

const makeElement = (component: ClassComponent<any, {n: number}, any>) =>
  React.createElement(component, {n: 10})

makeElement(TheComponent)
```
