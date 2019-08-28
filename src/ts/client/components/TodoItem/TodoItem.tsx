import React, { Component } from 'react';
import styles from './TodoItem.scss';
import * as hx from '../../../shared/hx';
import uuidv4 from 'uuid/v4';
import { observer } from 'mobx-react';
import { observable } from 'mobx';

@observer
class TodoItem extends Component<{item: hx.client.data.TodoItemStore, onDeleted: (item: hx.client.data.TodoItemStore) => void}> {
  @observable private isEditing: boolean = false;

  public render() {
    const { item } = this.props;

    return (
      <li key={uuidv4()} className={styles['todo-item']} data-completed={item.completed} data-editing={this.isEditing}>
        <input name='completed' type='checkbox' checked={item.completed} onChange={e => item.setCompleted((e.target as HTMLInputElement).checked)} />
        {this.renderItem()}
      </li>
    );
  }

  private edit(entered: string) {
    const { item, onDeleted } = this.props;

    const val = entered.trimRight();
    if (val === '') {
      onDeleted(item);
    } else {
      item.setDescription(val);
    }
  }

  private renderItem() {
    const { item, onDeleted } = this.props;

    if (this.isEditing) {
      return <input ref={input => { if (input) { input.focus(); }}} name='description' type='text' value={item.description}
                    onChange={e => { this.edit((e.target as HTMLInputElement).value); } }
                    onKeyDown={e => { if (e.which === 13) { this.isEditing = false; } } }
                    onBlur={() => this.isEditing = false } />;
    } else {
      return (
        <>
          <span className={styles.description} onDoubleClick={() => this.isEditing = true } >{item.description}</span>
          <button className={styles.delete} onClick={() => onDeleted(item)}>Delete</button>
        </>
      );
    }
  }
}

export default TodoItem;
