import Header from "@/components/Header";
import HeroSlider from "@/components/HeroSlider";
import ProductCarousel from "@/components/ProductCarousel";

export default function Home() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-6xl px-4 py-6">
        <HeroSlider />
        <ProductCarousel />
      </main>
    </>
  );
}
