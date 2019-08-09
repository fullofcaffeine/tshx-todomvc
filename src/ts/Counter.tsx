// SSR example
// https://medium.com/atticus-engineering/server-side-rendering-with-react-and-typescript-8cebb4400b3c

import React from 'react';

export interface ICounterState {
  counter: number;
}

class Counter extends React.Component<{}, ICounterState> {
  constructor(props: any) {
    super(props);
    this.state = { counter: 0 };
  }

  public incrementCounter() {
    this.setState({ counter: this.state.counter + 1 });
  }

  public render() {
    return (
      <div>
        <h1>counter at: {this.state.counter}</h1>
        <button
          onClick={() => this.incrementCounter()}
        />
      </div>
    );
  }
}

export default Counter;
