package server.externs.express;

extern class Express 
extends server.externs.express.Application
implements server.externs.npm.Package.Require<"express","~4.0"> {
	public function new() : Void;
}
