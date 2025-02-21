import { client } from "@/sanity/lib/client";
import { NextResponse } from "next/server";

export async function GET(request, context) {
	const params = await context.params; // Ensure params is awaited
	const { slug } = params;

	try {
		// Query to fetch a single product by slug
		const query = `*[_type == "product" && slug.current == $slug][0] {
      _id,
      title,
      displayTitle1,
      displayTitle2,
      displayTitle3,
      displayTitle4,
      displayTitle5,
      displayText1,
      displayText2,
      displayText3,
      displayText4,
      displayText5,
      "slug": slug.current,
      price,
      description,
      intro,
      category,
      status,
      images,
      banner
    }`;

		const product = await client.fetch(query, { slug });

		if (!product) {
			return NextResponse.json({ error: "Product not found" }, { status: 404 });
		}

		return NextResponse.json(product);
	} catch (error) {
		return NextResponse.json({ error: "Failed to fetch product" }, { status: 500 });
	}
}