import { getCollectionByHandle } from "@/lib/shopify";
import { NextResponse } from "next/server";

export async function GET(
  _req: Request,
  { params }: { params: Promise<{ handle: string }> }
) {
  const { handle } = await params;
  const products = await getCollectionByHandle(handle);
  return NextResponse.json(products, {
    headers: { "Cache-Control": "public, s-maxage=300, stale-while-revalidate=600" },
  });
}
