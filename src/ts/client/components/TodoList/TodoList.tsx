import React, { Component, KeyboardEvent } from 'react';

import styles from './TodoList.scss';
import { style } from '@material-ui/system';

export default class TodoList extends Component {

  public render() {
    return (
      <div className={styles["todo-list"]}>
        <h1>todos</h1>
        <Header/>
      </div>
    );
  }
}

class Header extends Component {
  private inputRef;
  private todos = {items: [], unfinished: 0}; //TODO refer to store

  constructor(props) {
    super(props);
    this.inputRef = React.createRef();
  }

  public render() {
    return (
    <header>
      <input ref={this.inputRef} type='text' placeholder='What needs to be done?' onKeyPress={this.onKeyPress} />
      {this.renderItems()}
    </header>
    );
  }

  private onKeyPress(e: KeyboardEvent) {
//    if (e.which === 
  // return "e => if (e.which == KeyboardEvent.DOM_VK_RETURN && e.src.value != "") { todos.add(e.src.value); e.src.value = ""; }}"
  }

  private renderItems() {
    if (this.todos.items.length > 0) {
      if (this.todos.unfinished > 0) {
        return <button className={styles['mark-all']} onClick={() => this.todos.items.forEach(t => t.completed = true )}>Mark all as completed</button>;
      } else {
        return <button className='unmark-all' onClick={() => this.todos.items.forEach(t => t.completed = true)}>Unmark all as completed</button>;
      }
    }

  }




}
