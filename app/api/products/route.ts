import { NextResponse } from "next/server";


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const limit = Number(searchParams.get("limit") ?? "12");
  const skip  = Number(searchParams.get("skip")  ?? "0");

  const resp = await fetch(`https://dummyjson.com/products?limit=${limit}&skip=${skip}`);
  const json = await resp.json(); // { products, total, skip, limit }

  const items = (json.products || []).map((p: any) => ({
    id: String(p.id),
    title: p.title,
    price: p.price,
    image: p.images?.[0] ?? p.thumbnail, 
  }));

  return NextResponse.json({
    items,
    total: json.total,
    limit: json.limit,
    skip: json.skip,
    totalPages: Math.ceil(json.total / limit),
  });
}
