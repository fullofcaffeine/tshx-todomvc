package server.externs.express;

@:enum abstract StaticDotfilesOptions(String) {
	var Allow = "allow";
	var Deny = "deny";
	var Ignore = "ignore";
}

typedef StaticOptions = {
	?dotfiles : StaticDotfilesOptions,
	?etag : Bool,
	?extensions : Bool,
	?index : Bool,
	?lastModified : Bool,
	?maxAge : Int,
	?redirect : Bool,
	?setHeaders : Response -> String -> js.node.fs.Stats -> Void
}

@:native('static')
extern class Static 
implements server.externs.npm.Package.RequireNamespace<"express","~4.0"> #if !haxe3,#end
implements Middleware
{
	public function new( path : String , ?opts : StaticOptions ) : Void;
}
