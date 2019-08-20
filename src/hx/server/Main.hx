package server;

import js.node.Process;
import js.node.Buffer;
import server.externs.express.Request;
import server.externs.express.Response;
import server.externs.express.Express;
import server.externs.express.Static;
import js.node.Path;
import js.Node;
//import js.node.http.ServerResponse as Response;

typedef ExpressApp = server.externs.express.Application;


// Bridge to do the config heavylifting directly in js/ts and the more Haxey-specific one here (tink-related)
@:jsRequire('./setup-express-app', 'default')
extern class SetupFromTypescript {
  @:selfCall static function call(app: ExpressApp): ExpressApp;
}

class Main {
  static var app = SetupFromTypescript.call(new Express());

  public static function main() {
    var chalk = js.Lib.require('chalk');
    /*var path = js.Lib.require('path');
   // var html = js.Lib.require('./html');
    
    app.set('view engine', 'ejs');
    app.use('/assets', new Static(Path.join(Node.__dirname, '..', '..', '..', 'assets')));

    app.use(Routes.apiRouter());
    app.use(Routes.staticRouter());
    app.use(Routes.pagesRouter());*/
    app.use('/tink_api', (a: Request, b: Response, next) -> { TinkAPI.main(a, b); });

    app.listen(
      Config.SERVER_PORT,
      () -> { 
        trace('Express server listening on port ${Config.SERVER_PORT}'); 
     });
  }
}
