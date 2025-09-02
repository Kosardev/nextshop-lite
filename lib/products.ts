export type Product = { id: string; title: string; price: number; image: string; };

const base: Product[] = [
  { id: "p1", title: "Classic Tee", price: 29, image: "/images/tee.jpg" },
  { id: "p2", title: "Hoodie", price: 59, image: "/images/hoodie.jpg" },
  { id: "p3", title: "Sneakers", price: 99, image: "/images/sneakers.jpg" },
  { id: "p4", title: "Cap", price: 19, image: "/images/cap.jpg" },
  { id: "p5", title: "Backpack", price: 79, image: "/images/bag.jpg" },
  { id: "p6", title: "Jacket", price: 139, image: "/images/jacket.jpg" },
];

export const products: Product[] = Array.from({ length: 120 }).map((_, i) => {
  const b = base[i % base.length];
  return { ...b, id: `p${i+1}`, title: `${b.title} ${i+1}` };
});

export function getPage(page=1, pageSize=12) {
  const start = (page-1)*pageSize;
  const end = start + pageSize;
  const total = products.length;
  const totalPages = Math.ceil(total/pageSize);
  return { items: products.slice(start, end), total, totalPages };
}
