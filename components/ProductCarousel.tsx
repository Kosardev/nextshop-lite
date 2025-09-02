"use client";
import { products } from "@/lib/products";
import ProductCard from "./ProductCard";
import { useRef } from "react";

export default function ProductCarousel() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir:"prev"|"next")=>{
    const el = ref.current; if(!el) return;
    el.scrollBy({ left: (el.clientWidth * 0.9) * (dir==="next"?1:-1), behavior: "smooth" });
  };
  return (
    <section className="mt-10">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold">Featured products</h2>
        <div className="flex gap-2">
          <button onClick={()=>scroll("prev")} className="rounded bg-gray-100 px-2 py-1">‹</button>
          <button onClick={()=>scroll("next")} className="rounded bg-gray-100 px-2 py-1">›</button>
        </div>
      </div>
      <div ref={ref} className="flex gap-4 overflow-x-auto snap-x snap-mandatory no-scrollbar">
        {products.slice(0,12).map(p => (
          <div key={p.id} className="min-w-[260px] snap-start">
            <ProductCard item={p}/>
          </div>
        ))}
      </div>
    </section>
  );
}
