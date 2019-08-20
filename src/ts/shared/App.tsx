import 'typeface-roboto';
import { Grid, Button } from '@material-ui/core';
import React, { Component } from 'react';
import * as hx from '../client/hx';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

// ssr experiment, client-side rendering sample
import Counter from '../Counter';

type IProps = hx.client.data.IThingProps;
type IState = hx.client.data.IThingState;
type IReactComponent = hx.client.data.IReactComponent;

@observer class App extends Component<IProps, IState> implements IReactComponent {
  @observable public foo: string;
  private controller: hx.client.data.ThingController;

  constructor(props) {
    super(props);
    this.state = {result: 'Default'};
    this.controller = new hx.client.data.ThingController(this);
  }
  public render() {
    return (
      <Grid container justify='center'>
        <Grid style={{ textAlign: 'center' }} item xs={12}>
          <h1>{this.state.result}FOO</h1>
          <h2>{this.foo}</h2>
          <Button onClick={this.controller.clickBtn}>Click me!</Button>
        </Grid>
        <Counter/>
      </Grid>
    );
  }
}

export default App;
