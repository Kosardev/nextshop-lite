"use client";
import { useEffect, useRef, useState } from "react";
import ProductCard from "@/components/ProductCard";

type ApiResp = { items: any[]; total: number; limit: number; skip: number; totalPages: number };

const LIMIT = 12;
const INFINITE_MAX_PAGES = 10;   // تا 10 صفحه اول اینفینیت
// اگر دیتابیس بزرگه، totalPages رو از API می‌گیریم.

export default function HybridProducts() {
  const [items, setItems] = useState<any[]>([]);
  const [page, setPage]   = useState(1);
  const [totalPages, setTotalPages] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [infiniteDone, setInfiniteDone] = useState(false);
  const loaderRef = useRef<HTMLDivElement>(null);

  const fetchPage = async (p: number) => {
    setLoading(true);
    const skip = (p - 1) * LIMIT;
    const res = await fetch(`/api/products?limit=${LIMIT}&skip=${skip}`);
    const data: ApiResp = await res.json();
    setTotalPages(data.totalPages);
    // جلوگیری از key تکراری:
    setItems(prev => {
      const next = [...prev, ...data.items];
      const seen = new Set<string>();
      return next.filter((it) => {
        const k = it.id + ":" + it.title;
        if (seen.has(k)) return false;
        seen.add(k);
        return true;
      });
    });
    setLoading(false);
  };

  // بارگیری صفحه‌های اینفینیت
  useEffect(() => { fetchPage(page); }, [page]);

  // اینفینیت تا سقف 10 صفحه، بعد قطع و سوییچ به pagination
  useEffect(() => {
    if (infiniteDone) return;
    const ob = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !loading) {
        setPage((p) => {
          const next = p + 1;
          const reached = next > INFINITE_MAX_PAGES;
          if (reached) setInfiniteDone(true);
          return reached ? p : next;
        });
      }
    }, { rootMargin: "200px" });
    const el = loaderRef.current;
    if (el) ob.observe(el);
    return () => { if (el) ob.unobserve(el); };
  }, [infiniteDone, loading]);

  const goToPage = async (target: number) => {
    // سوییچ به pagination: لیست رو خالی می‌کنیم و صفحه‌ی مورد نظر رو می‌آریم
    setItems([]);
    setPage(target);
    setInfiniteDone(true);
    await fetchPage(target);
  };

  const pages = totalPages ? Array.from({ length: totalPages }, (_, i) => i + 1) : [];

  return (
    <>
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 md:grid-cols-3">
        {items.map((p, i) => <ProductCard key={`${p.id}-${i}`} item={p} />)}
      </div>

      {!infiniteDone && (
        <div ref={loaderRef} className="py-10 text-center text-sm text-gray-500">
          {loading ? "Loading…" : "Scroll to load more"}
        </div>
      )}

      {/* وقتی به سقف اینفینیت رسیدیم، pagination ظاهر میشه */}
      {infiniteDone && totalPages && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
          <button
            className="px-3 py-1 rounded border"
            onClick={() => goToPage(Math.max(1, page - 1))}
          >
            Prev
          </button>

          {pages.slice(0, 20).map((p) => ( // حداکثر ۲۰ تا نشون بده که شلوغ نشه
            <button
              key={p}
              onClick={() => goToPage(p)}
              className={`px-3 py-1 rounded border ${p === page ? "bg-black text-white" : "hover:bg-gray-100"}`}
            >
              {p}
            </button>
          ))}

          <button
            className="px-3 py-1 rounded border"
            onClick={() => goToPage(Math.min(totalPages, page + 1))}
          >
            Next
          </button>
        </div>
      )}
    </>
  );
}
