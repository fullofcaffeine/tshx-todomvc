package server.externs.express;


/**
 * Favicon
 * @author TiagoLr
 */
extern
class Favicon implements server.externs.npm.Package.Require < "serve-favicon", "*" > #if !haxe3,#end
implements Middleware {

	public function new(path:String) : Void;
	
}
