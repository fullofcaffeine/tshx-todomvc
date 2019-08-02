package server;

import js.Node.process;

using Std;

// Check ts/srv/config.js. It's processed by tsc and copied into dist/server/config.js
// which is the same dir this hx file is compiled to (into dist/server/server.js)
@:jsRequire('./config.js')
extern class Config {
  public static var IS_PRODUCTION: Bool;
  public static var SERVER_PORT: Int;
  public static var WEBPACK_PORT: Int;
}
