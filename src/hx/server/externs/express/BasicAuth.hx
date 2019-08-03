package server.externs.express;

extern class BasicAuth
implements npm.Package.Require<"basic-auth", "^1.0.4">
{
	@:selfCall
	public static function auth(req : Request) : Null<{name: String, pass: String}>;
}
