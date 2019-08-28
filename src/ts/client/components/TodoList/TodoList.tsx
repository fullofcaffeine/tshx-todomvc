import React, { Component, KeyboardEvent, Ref } from 'react';

import styles from './TodoList.scss';
import { style } from '@material-ui/system';
import { TodoItem } from '../TodoItem';
import * as hx from '../../../shared/hx';
import { observer } from 'mobx-react';
import { observable, decorate, computed } from 'mobx';
import uuidv4 from 'uuid/v4';

@observer class TodoList extends Component {
  @observable private todos = new hx.client.data.TodoListStore();
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
        return <TodoItem key={uuidv4()} item={item} onDeleted={this.todos.delete.bind(this.todos, item)} />;
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
      <input ref={this.inputRef} type='text' placeholder='What needs to be done?' onKeyPress={this.onKeyPress.bind(this)} />
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
        return <button className={styles['mark-all']} onClick={() => todos.items.map(t => t.completed = true )}>Mark all as completed</button>;
      } else {
        return <button className='unmark-all' onClick={() => todos.items.map(t => t.completed = true)}>Unmark all as completed</button>;
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
            filter.mapOptions(fo => {
              return <button onClick={() => filter.toggle(fo.value)}
                             data-active={filter.isActive(fo.value)}
                     >{fo.name}</button>;

            })
          }
        </menu>
        {todos.hasAnyCompleted && <button onClick={todos.clearCompleted.bind(todos)}>Clear Completed</button>}
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
