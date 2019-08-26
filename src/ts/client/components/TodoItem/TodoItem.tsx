import React, { Component } from 'react';
import styles from './TodoItem.scss';

export default class TodoItem extends Component<{key: any, item: any, onDeleted: (item: any) => void}, any> {
  private item = {description: '', completed: false};
  private onDeleted: (item: any) => void; // TODO Type it
  private isEditing: boolean = false;

  public render() {

    return (
      <li className={styles['todo-item']} data-completed={this.item.completed} data-editing={this.isEditing}>
        <input name='completed' type='checkbox' onChange={e => this.item.completed = (e.target as HTMLInputElement).checked} />
      </li>
    );
  }

  private edit(entered: string) {
    const val = entered.trimRight();
    if (val === '') {
      this.onDeleted(this.item);
    } else {
      this.item.description = val;
    }
  }

  private eonChange(e: Event) {
    this.item.completed = (e.target as HTMLInputElement).checked;
  }

  private renderItem() {
    if (this.isEditing) {
      return <input ref={input => { if (input) { input.focus(); }}} name='description' type='text' value={this.item.description}
                    onChange={e => { this.edit.bind(this, (e.target as HTMLInputElement).value); } }
                    onBlur={() => this.isEditing = false } />;
    } else {
      return (
        <>
          <span className={styles['todo-item']} onDoubleClick={() => this.isEditing = true}>{this.item.description}</span>
          <button className={styles.delete} onClick={this.onDeleted.bind(this, this.item)}>Delete</button>
        </>
      );
    }
  }
}
