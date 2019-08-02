import 'typeface-roboto';
import { Grid, Button } from '@material-ui/core';
import React, { Component } from 'react';
import * as hx from './hx';

type IProps = hx.client.data.IThingProps;
type IState = hx.client.data.IThingState;

class App extends Component<IProps, IState> {
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
          <Button onClick={this.controller.clickBtn.bind(this.controller)}>Click me!</Button>
        </Grid>
      </Grid>
    );
  }
}

export default App;
