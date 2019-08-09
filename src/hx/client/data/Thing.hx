package client.data;

import js.Browser;
import coconut.data.Model;
import react.ReactComponent;

using tink.state.Promised.PromisedTools;

class Thing implements Model {
    @:constant var foo: String = 'Hello from Coconut!';
    @:loaded var bar: ApiResult.Result = TinkProxy.Client.call();
//  @:observable var someObsevableField: String = 'Original value';
//  @:loaded var someFieldLoadedFromTheServer: String = {};

//  @:transition function changeObservableField() {
//    return {someObservableField: "Oh wow, I've got a new value!"};
//  }
}

@:expose typedef IThingProps = {}
@:expose typedef IThingState = {
  var result: String;
}

// To be implemented by the TS react Comp
@:expose interface IReactComponent {
  var foo: String;
}
extern class ReactComponent extends ReactComponentOfPropsAndState<IThingProps, IThingState> implements IReactComponent {
  public var foo: String;
}

// TODO Move it to its own exter
@:jsRequire('class-autobind', 'default')
extern class Autobind {
  @:selfCall public function new(obj: Dynamic);
}

// Rename to viewModel, keep in this module for now
@:expose
class ThingController {
 private var reactComponent: ReactComponent;
 private var model: Thing = new Thing();

 public function new(reactComponent: ReactComponent) {
   this.reactComponent = reactComponent;
   model.observables.bar.bind((o: tink.state.Promised<ApiResult.Result>) -> {
     switch(o) {
       case Loading: 
       case Done(result): this.setState(result);
       case Failed(error): throw(error);
     };
   });
   new Autobind(this);
 }

 public function clickBtn() {
   Browser.console.debug('foo');
   this.reactComponent.state.result = 'Wowowowowo!';
   this.reactComponent.foo = 'NOICE';
 }

 private function setState(state: ApiResult.Result) {
   this.reactComponent.state.result = state.slideshow.author;
 }
}
