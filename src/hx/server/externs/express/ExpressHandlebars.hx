package server.externs.express;

extern class ExpressHandlebars
implements server.externs.npm.Package.Require<"express-handlebars", "^1.1.0">
{
	public static function create(?config : {}) : ExpressHandlebars;

	public var engine : Dynamic;
}
