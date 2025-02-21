import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET() {
	try {
		const query = `*[_type == "gender"] | order(title asc)`;
		const products = await client.fetch(query);
		return NextResponse.json(products);
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch products" }, { status: 500 });
	}
}
