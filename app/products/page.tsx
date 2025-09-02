import Header from "@/components/Header";
import HybridProducts from "./ui";

export default function HybridPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-xl font-semibold mb-4">Products — Infinite → Pagination</h1>
        <HybridProducts />
      </main>
    </>
  );
}
