export type Product = {
    id: string;
    title: string;
    price: number;
    image: string;
};
  
export const products: Product[] = [
    { id: "p1", title: "Classic Tee", price: 29, image: "/images/tee.jpg" },
    { id: "p2", title: "Hoodie",     price: 59, image: "/images/hoodie.jpg" },
    { id: "p3", title: "Sneakers",   price: 99, image: "/images/sneakers.jpg" },
];
  