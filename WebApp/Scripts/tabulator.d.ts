//interface TabulatorStatic {
//	selector: string;
//	param: any;
//}

//export class Tabulator {

//	constructor(
//		selector: string,
//		param: any);
//}

//declare module "tabulator" {
//	export = Tabulator;
//}
//declare var Tabulator: TabulatorStatic;
//export class Tabulator {
//	constructor(selector: string, param: any);
//}

//Tabulator {

//		constructor(
//			selector: string,
//			param: any) {
//		}

interface TabulatorStatic {
	setFilter(s1: string, s2: string, s3: string): void;
	download(s1: string, s2: string): void;
}

declare function Tabulator(selector: string, param: any): void;