import React, { Component, KeyboardEvent, Ref } from 'react';

import styles from './TodoList.scss';
import { style } from '@material-ui/system';
import { TodoItem } from '../TodoItem';
import { throws } from 'assert';

export default class TodoList extends Component {
  private todos = [];
  private filter = {matches: (t: any) => t};

  public render() {
    return (
      <div className={styles['todo-list']}>
        <h1>todos</h1>
        <Header/>
        <ol>
          {
            this.todos.map(item => {
              if (this.filter.matches(item)) {
                return <TodoItem key={item} item={item} onDeleted={(t: any) => t} />;
              }
            })
          }
        </ol>
      </div>
    );
  }
}

class Header extends Component {
  private inputRef = React.createRef<HTMLInputElement>();
  private todos = {items: [], unfinished: 0, add: v => v}; // TODO refer to store

  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    const i = this.inputRef.current;
    if (i) { i.focus(); }
  }

  public render() {
    return (
    <header>
      <input ref={this.inputRef} type='text' placeholder='What needs to be done?' onKeyPress={this.onKeyPress.bind(this)} />
      {this.renderItems()}
    </header>
    );
  }

  private onKeyPress(e: KeyboardEvent) {
    const inputFromEvent = e.target as HTMLInputElement;
    if (e.which === 13) { // DOM_VK_RETURN
      this.todos.add(inputFromEvent.value);
      inputFromEvent.value = '';
    }
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

class Footer extends Component {
  private todos = {unfinished: 1, hasAnyCompleted: false, clearCompleted: () => true};
  private filter = {options: [], toggle: (f: any) => f, isActive: (f: any) => true};

  public render() {
    return (
      <footer>
        <span>
          {this.renderUnfinished()}
        </span>

        <menu>
          {
            this.filter.options.map(fo => {
              return <button onClick={() => this.filter.toggle(fo.value)}
                             data-active={this.filter.isActive(fo.value)}
                     >{fo.name}</button>;

            })
          }
        </menu>
        {this.todos.hasAnyCompleted && <button onClick={this.todos.clearCompleted}>Clear Completed</button>}
      </footer>
    );
  }

  private renderUnfinished() {
    const v = this.todos.unfinished;
    return <span>
      {
        v === 1
          ? '1 item'
          : `${v} items`
      }
    </span>;
  }
}
