import Header from "@/components/Header";
import { getPage } from "@/lib/products";
import ProductCard from "@/components/ProductCard";
import Link from "next/link";

export default async function Products({ searchParams }: { searchParams: { page?: string } }) {
  const page = Number(searchParams.page || "1");
  const pageSize = 12;
  const { items, totalPages } = getPage(page, pageSize);
  return (
    <>
      <Header/>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-xl font-semibold mb-4">Products (page {page}/{totalPages})</h1>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
          {items.map(p => <ProductCard key={p.id} item={p}/>)}
        </div>

        <div className="mt-8 flex items-center justify-center gap-2">
          <Link href={`/products?page=${Math.max(1, page-1)}`}
                className={`px-3 py-1 rounded border ${page===1 ? "pointer-events-none opacity-50": ""}`}>
            Prev
          </Link>
          <span className="text-sm">Page {page} of {totalPages}</span>
          <Link href={`/products?page=${Math.min(totalPages, page+1)}`}
                className={`px-3 py-1 rounded border ${page===totalPages ? "pointer-events-none opacity-50": ""}`}>
            Next
          </Link>
        </div>
      </main>
    </>
  );
}
