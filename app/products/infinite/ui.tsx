"use client";
import { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";

type ApiResp = { page:number; size:number; items:any[]; total:number; totalPages:number; };

export default function InfiniteProducts() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [done, setDone] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);
  const pageSize = 12;
  const limitPages = 10; // تا 10 صفحه

  useEffect(() => {
    const load = async () => {
      const res = await fetch(`/api/products?page=${page}&size=${pageSize}`);
      const data: ApiResp = await res.json();
      setItems(prev => [...prev, ...data.items]);
      if (page >= Math.min(limitPages, data.totalPages)) setDone(true);
    };
    load();
  }, [page]);

  useEffect(() => {
    if (done) return;
    const ob = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting) {
        setPage(p => p + 1);
      }
    }, { rootMargin: "200px" });
    const el = loaderRef.current;
    if (el) ob.observe(el);
    return () => { if (el) ob.unobserve(el); };
  }, [done]);

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.map((p:any) => <ProductCard key={p.id} item={p}/>)}
      </div>

      {!done && <div ref={loaderRef} className="py-10 text-center text-sm text-gray-500">Loading…</div>}

      {done && (
        <div className="mt-8 text-center text-sm">
          Reached the infinite scroll limit. Continue with{" "}
          <a className="underline" href={`/products?page=${limitPages+1}`}>pagination</a>.
        </div>
      )}
    </>
  );
}
