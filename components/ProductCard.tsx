import Image from "next/image";
import { Product } from "@/lib/products";

export default function ProductCard({ item }: { item: Product }) {
  return (
    <div className="rounded-xl border p-4 hover:shadow-md transition">
      <div className="relative aspect-square w-full overflow-hidden rounded-lg bg-gray-50">
        <Image src={item.image} alt={item.title} fill sizes="(min-width: 768px) 25vw, 50vw" className="object-cover" />
      </div>
      <div className="mt-3 flex items-center justify-between">
        <h3 className="font-medium">{item.title}</h3>
        <span className="text-sm text-gray-600">€{item.price}</span>
      </div>
      <button className="mt-3 w-full rounded-lg bg-black px-3 py-2 text-white hover:bg-gray-800">
        Add to cart
      </button>
    </div>
  );
}