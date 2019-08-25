import 'typeface-roboto';
import { Grid, Button, Input } from '@material-ui/core';
import React, { Component } from 'react';
import * as hx from '../shared/hx';
import { observer } from 'mobx-react';
import { observable } from 'mobx';
import { TodoList } from './components/TodoList';

type IProps = hx.client.data.IThingProps;
type IReactComponent = hx.client.data.IReactComponent;

const StoreProvider = React.createContext({});

@observer class App extends Component<IProps, {}> implements IReactComponent {
  @observable public title: string;
  @observable public foo: string;

  private controller: hx.client.data.ThingStore;

  constructor(props) {
    super(props);
  }
  public render() {
    return (
      <TodoList/>
    );
  }
}

export default App;
