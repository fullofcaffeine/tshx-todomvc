import React, { Component } from 'react';
import styles from './TodoItem.scss';
import * as hx from '../../../shared/hx';
import uuidv4 from 'uuid/v4';

export default class TodoItem extends Component<{item: hx.client.data.TodoItemStore, onDeleted: (item: hx.client.data.TodoItemStore) => void}> {
  private isEditing: boolean = false;

  public render() {
    const { item } = this.props;

    return (
      <li key={uuidv4()} className={styles['todo-item']} data-completed={item.completed} data-editing={this.isEditing}>
        <input name='completed' type='checkbox' onChange={e => item.setCompleted((e.target as HTMLInputElement).checked)} />
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
                    onChange={e => { this.edit.bind(this, (e.target as HTMLInputElement).value); } }
                    onBlur={() => this.isEditing = false } />;
    } else {
      return (
        <>
          <span className={styles['todo-item']} onDoubleClick={() => this.isEditing = true}>{item.description}</span>
          <button className={styles.delete} onClick={onDeleted.bind(this, item)}>Delete</button>
        </>
      );
    }
  }
}
