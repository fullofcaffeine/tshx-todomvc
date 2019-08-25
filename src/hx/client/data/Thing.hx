package client.data;

import js.Browser;
import coconut.data.Model;
import react.ReactComponent;

using tink.state.Promised.PromisedTools;

class Thing implements Model {
    @:constant var foo: String = 'Hello from Coconut!';
    @:loaded var bar: ApiResult.Result = TinkProxy.Client.call();
    @:observable var title: String = 'Nice';

    @:transition function setTitle(to: String) {
      return {title: to};
    }
}

@:expose typedef IThingProps = {}

// To be implemented by the TS react Comp
@:expose interface IReactComponent {
  public var foo: String;
  public var title: String;
}

extern class ReactComponent extends ReactComponentOfProps<IThingProps> implements IReactComponent {
  public var foo: String;
  public var title: String;
}

// TODO Move it to its own exter
@:jsRequire('class-autobind', 'default')
extern class Autobind {
  @:selfCall public function new(obj: Dynamic);
}

// Rename to viewModel, keep in this module for now
@:expose
class ThingStore {
 private var reactComponent: ReactComponent;
 private var model: Thing = new Thing();

 public function new(reactComponent: ReactComponent) {
   this.reactComponent = reactComponent;

   // This should be automated with a macro?
   model.observables.bar.bind((o: tink.state.Promised<ApiResult.Result>) -> {
     switch(o) {
       case Loading: 
       case Done(result): this.setState(result);
       case Failed(error): throw(error);
     };
   });
   new Autobind(this);

   model.observables.title.bind({direct: true}, (title) -> this.reactComponent.title = title);
 }

 public function handleChange(e: Dynamic) {
   this.model.setTitle(e.target.value);
 }

 public function clickBtn() {
   Browser.console.debug('foo');
   this.reactComponent.state.result = 'Wowowowowo!';
 }

 private function setState(state: ApiResult.Result)  {
   trace('WOARALES');
   this.reactComponent.title = state.slideshow.author;
   this.reactComponent.foo = 'NOIPPP';
 }
}
