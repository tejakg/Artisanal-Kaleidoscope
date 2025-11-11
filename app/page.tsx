import Hero from '@/components/home/Hero';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import BestSellers from '@/components/home/BestSellers';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <BestSellers />
      <CTASection />
    </>
  );
}
