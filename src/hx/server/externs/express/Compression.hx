package server.externs.express;
import server.externs.express.Middleware;

extern class Compression
implements server.externs.npm.Package.Require<"compression", "^1.10.1"> #if !haxe3,#end
implements Middleware
{
	public function new(?options : {}) : Void;
}
