
export interface Product {
	readonly id?: number;
	title: string;
	productno: string | null;
	barcode?: string | null;         // Allow null values
	serieno?: string | null;          // Allow null values for compatibility
	price?: number | null;
	costprice?: number | null;
	stockno?: number | null;          // Allow null values
	readonly previousstockno?: number | null;
	readonly stocknochangetype?: "absolute" | "relative";
	stockmin?: number | null;
	stockmax?: number | null;
	suppliername?: string | null;     // Allow null values
	color?: string | null;            // Allow null values
	styleno?: string | null;          // Allow null values
	size?: string | null;             // Allow null values
	brand?: string | null;            // Allow null values
	vat?: number | null;
	lastordered?: string | null;
	tags?: Array<any>;
	customfield1?: string | null;     // Allow null values
	customfield2?: string | null;     // Allow null values
	customfield3?: string | null;     // Allow null values
	readonly created?: string | null;
	readonly reservedstock?: number | null;
	readonly tobeordered?: number | null;
	readonly onshoppinglist?: number | null;
	readonly ordered?: number | null;
	readonly needsordering?: number | null;
	readonly flexposuid?: string | null;
	readonly flexposviewgroup?: string | null;
	flexposviewgroupid?: string | null;
	flexposfinancegroup?: string | null;
	flexposfinancegroupid?: string | null;
	flexposbrandid?: string | null;
}

export interface SearchProductResponse {
	content? : Array<Product>
}

