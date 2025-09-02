import Header from "@/components/Header";
import InfiniteProducts from "./ui";

export default function InfinitePage() {
  return (
    <>
      <Header/>
      <main className="mx-auto max-w-6xl px-4 py-6">
        <h1 className="text-xl font-semibold mb-4">Infinite Products (up to 10 pages)</h1>
        <InfiniteProducts />
      </main>
    </>
  );
}
