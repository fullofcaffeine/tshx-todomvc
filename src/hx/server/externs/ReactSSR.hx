package server.externs;

@:jsRequire('./react-ssr')
extern class ReactSSR {
  public function new();
  @:selfCall public function render(): String;
}
