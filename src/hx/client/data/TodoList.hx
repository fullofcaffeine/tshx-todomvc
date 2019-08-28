package client.data;

import client.externs.Mobx;
import coconut.data.*;
import tink.pure.List;

import client.data.TodoItem.TodoItemModel;
import client.data.TodoItem.TodoItemStore;

@:expose
class TodoListModel implements Model {
  @:observable var items:List<TodoItemModel> = @byDefault null;
  @:computed var unfinished:Int = items.count(TodoItemModel.isActive);
  @:computed var hasAnyCompleted:Bool = unfinished < items.length;

  @:transition function add(description:String) {
    return { items: items.prepend(TodoItemModel.create(description)) };
  }
  
  @:transition function delete(item)
    return { items: items.filter(i => i != item) };

  @:transition function clearCompleted() 
    return { items: items.filter(i => !i.completed) };
}

@:expose
class TodoListStore {
  private var todoList: TodoListModel;
  public var items: Array<TodoItemStore> = [];
  public var length: Int = 0;
  public var unfinished: Int = 0;
  public var hasAnyCompleted: Bool = false;

  static function __init__():Void {
    Mobx.decorate(TodoListStore, {
      items: Mobx.observable,
      unfinished: Mobx.observable,
      hasAnyCompleted: Mobx.observable,
      length: Mobx.observable
    });
  }
  
  public function new() {
    this.todoList = new TodoListModel();
    this.setupObservables();
  }

  private function setupObservables() {
    this.items = this.todoList.items.map((item) -> TodoItemStore.wrap(item)).toArray();

    this.todoList.observables.items.bind({}, (items) -> { 
      this.items = items.map((item) -> TodoItemStore.wrap(item)).toArray(); 
      this.length = this.items.length;
    });

    this.todoList.observables.unfinished.bind({}, (val) -> this.unfinished = val);
    this.todoList.observables.hasAnyCompleted.bind({}, (val) -> this.hasAnyCompleted = val);
  }

  public function get_items() {
    return this.items;
  }

  public function add(description: String) {
    this.todoList.add(description);
  }

  public function delete(store: TodoItemStore) {
    this.todoList.delete(store.item);
  }

  public function clearCompleted() {
    this.todoList.clearCompleted();
  }
}
