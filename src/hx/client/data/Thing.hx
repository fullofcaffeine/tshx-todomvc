package client.data;

import coconut.data.Model;
import react.ReactComponent;

import react.ReactMacro.jsx;


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

typedef ReactComponent = ReactComponentOfPropsAndState<IThingProps, IThingState>;


// Rename to viewModel, keep in this module for now
@:expose
class ThingController {
 public var bare(default, default): ApiResult.Result;
 private var reactComponent: ReactComponent;

 public function new(reactComponent: ReactComponent) {
   this.reactComponent = reactComponent;
 
   var model = new Thing();
   model.observables.bar.bind((o: tink.state.Promised<ApiResult.Result>) -> {
     switch(o) {
       case Loading: 
       case Done(result): this.setState(result);
       case Failed(error): throw(error);
     };
   });
 }

 public function clickBtn() {
   this.reactComponent.setState({result: 'Wowowowowo!'});
 }

// consider typing it as a React component using the react externs
 private function setState(bare: ApiResult.Result) {
   this.reactComponent.setState({result: bare.slideshow.author});
 }
}
