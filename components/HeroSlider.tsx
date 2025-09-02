"use client";
import Image from "next/image";
import { useRef } from "react";

const banners = [
  { id: "b1", img: "/images/banner1.jpg", alt: "Summer Sale" },
  { id: "b2", img: "/images/banner2.jpg", alt: "New Arrivals" },
  { id: "b3", img: "/images/banner3.jpg", alt: "Free Shipping" },
];

export default function HeroSlider() {
  const ref = useRef<HTMLDivElement>(null);
  const scroll = (dir: "prev" | "next") => {
    const el = ref.current;
    if (!el) return;
    const w = el.clientWidth;
    el.scrollBy({ left: dir === "next" ? w : -w, behavior: "smooth" });
  };
  return (
    <div className="relative">
      <div ref={ref} className="overflow-x-auto scroll-smooth snap-x snap-mandatory no-scrollbar">
        <div className="flex">
          {banners.map(b => (
            <div key={b.id} className="relative min-w-full snap-start aspect-[16/6] bg-gray-100">
              <Image src={b.img} alt={b.alt} fill className="object-cover" priority />
            </div>
          ))}
        </div>
      </div>
      <div className="absolute inset-0 flex items-center justify-between px-2">
        <button onClick={() => scroll("prev")} className="rounded-full bg-white/80 px-3 py-1 text-sm">‹</button>
        <button onClick={() => scroll("next")} className="rounded-full bg-white/80 px-3 py-1 text-sm">›</button>
      </div>
    </div>
  );
}
