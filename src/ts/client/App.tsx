import 'typeface-roboto';
import { Grid, Button, Input } from '@material-ui/core';
import React, { Component } from 'react';
import * as hx from '../shared/hx';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import style2 from 'App.sass';
import style from 'Foo.module.css';

// ssr experiment, client-side rendering sample
import Counter from '../Counter';

console.log(style);

type IProps = hx.client.data.IThingProps;
type IReactComponent = hx.client.data.IReactComponent;

const StoreProvider = React.createContext('foo');

@observer class App extends Component<IProps, {}> implements IReactComponent {
  @observable public title: string;
  @observable public foo: string;

  private controller: hx.client.data.ThingController;

  constructor(props) {
    super(props);
    this.controller = new hx.client.data.ThingController(this);
  }
  public render() {
    return (
      <Grid container justify='center' className={style2.foo}>
        <Grid style={{ textAlign: 'center' }} item xs={12}>
          <h1>{this.title}</h1>
          <h1>FOOO</h1>
          <h2>{this.foo}</h2>
          <Button variant='contained' onClick={this.controller.clickBtn}>Click me!</Button>
          <Input type='text' onChange={this.controller.handleChange}></Input>
        </Grid>
        <Counter/>
      </Grid>
    );
  }
}

export default App;
