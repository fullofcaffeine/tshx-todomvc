// Generated by Haxe TypeScript Declaration Generator :)

export namespace client.data {
	export type IThingProps = {
	}
}

export namespace client.data {
	export type IThingState = {
		result: string;
	}
}

export type Result = {
	slideshow: {author: string, date: string, slides: {items?: string[], title: string, type: string}[], title: string};
}

export namespace client.data {
	export class ThingController {
		constructor(reactComponent: React.Component<client.data.IThingProps,client.data.IThingState,any>);
		bare: Result;
		clickBtn(): void;
	}
}