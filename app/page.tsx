import ProductCard from "@/components/ProductCard";
import { products } from "@/lib/products";

export default function Home() {
  return (
    <main className="mx-auto max-w-6xl px-4 py-8">
      <header className="mb-8">
        <h1 className="text-2xl md:text-3xl font-semibold">NextShop Lite</h1>
        <p className="text-gray-600">A minimal e-commerce demo (Next.js 15 + TS + Tailwind)</p>
      </header>

      <section className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {products.map((p) => (
          <ProductCard key={p.id} item={p} />
        ))}
      </section>
    </main>
  );
}
