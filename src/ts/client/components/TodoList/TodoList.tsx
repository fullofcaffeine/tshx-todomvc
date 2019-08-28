import React, { Component, KeyboardEvent, Ref } from 'react';

import styles from './TodoList.scss';
import { style } from '@material-ui/system';
import { TodoItem } from '../TodoItem';
import * as hx from '../../../shared/hx';
import { observer } from 'mobx-react';
import { observable, decorate, computed } from 'mobx';
import uuidv4 from 'uuid/v4';

@observer class TodoList extends Component {
  private todos = new hx.client.data.TodoListStore();
  private filter = new hx.client.data.TodoFilterStore();

  public render() {
    console.log(this.todos);
    return (
      <div className={styles['todo-list']}>
        <h1>todos</h1>
        <Header todos={this.todos}/>
        <ol>
          {this.renderItems()}
        </ol>
        <Footer todos={this.todos} filter={this.filter}/>
      </div>
    );
  }

  private renderItems() {
    return this.todos.items.map(item => {
      if (this.filter.matches(item)) {
        return <TodoItem key={uuidv4()} item={item} onDeleted={() => this.todos.delete(item)} />;
      }
    });
  }
}

@observer
class Header extends Component<{todos: hx.client.data.TodoListStore}> {
  private inputRef = React.createRef<HTMLInputElement>();

  constructor(props) {
    super(props);
  }

  public componentDidMount() {
    const i = this.inputRef.current;
    if (i) { i.focus(); }
  }

  public render() {
    const { todos } = this.props;
    return (
    <header>
      <input ref={this.inputRef} type='text' placeholder='What needs to be done?' onKeyPress={e => this.onKeyPress(e)} />
      {this.renderItems()}
    </header>
    );
  }

  private onKeyPress(e: KeyboardEvent) {
    const { todos } = this.props;
    const inputFromEvent = e.target as HTMLInputElement;
    if (e.which === 13) { // DOM_VK_RETURN
      todos.add(inputFromEvent.value);
      inputFromEvent.value = '';
    }
  }

  private renderItems() {
    const { todos } = this.props;
    if (todos.length > 0) {
      if (todos.unfinished > 0) {
        return <button className={styles['mark-all']} onClick={() => todos.items.map(t => t.setCompleted(true))}>Mark all as completed</button>;
      } else {
        return <button className='unmark-all' onClick={() => todos.items.map(t => t.setCompleted(false))}>Unmark all as completed</button>;
      }
    }
  }
}

@observer
class Footer extends Component<{todos: hx.client.data.TodoListStore, filter: hx.client.data.TodoFilterStore}> {
  public render() {
    const { todos, filter } = this.props;

    return (
      <footer>
        <span>
          {this.renderUnfinished()}
        </span>

        <menu>
          {
            filter.options.map(o => {
              return <button key={uuidv4()} onClick={() => filter.toggle(o.value)}
                              // had to remove the use of a function call here as Mobx was NOT re-rendering
                              // using a comparsion with an observed attribute solves the issue
                              // but coconut makes it easier by supporting (?) function calls by default.
                             data-active={o.value === filter.currentFilter}
                     >{o.name}</button>;
            })
          }
        </menu>
        {todos.hasAnyCompleted && <button onClick={() => { todos.clearCompleted();  }}>Clear Completed</button>}
      </footer>
    );
  }

  private renderUnfinished() {
    const { todos } = this.props;

    const v = todos.unfinished;
    return <span>
      {
        v === 1
          ? '1 item'
          : `${v} items`
      }
    </span>;
  }
}

export default TodoList;
