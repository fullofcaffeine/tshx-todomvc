package client.externs;

@:jsRequire('mobx')
extern class Mobx {
  extern static var observable: Dynamic;
  extern static var computed: Dynamic;
  extern static function decorate(klass: Class<{}>, options: Dynamic):Void;
}

@:jsRequire('mobx-utils')
extern class MobxUtils {
  extern static function createTransformer(arg: Dynamic):Dynamic;
}
