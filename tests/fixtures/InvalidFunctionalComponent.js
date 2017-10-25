// @flow
import * as React from 'react';

// This is an invalid functional component. HigherOrderComponents shouldn't accept this as input
const InvalidFunctionalComponent = (props: {string1: string, number1: number}) => 'hi';

export default InvalidFunctionalComponent;