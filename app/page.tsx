import Hero from '@/components/home/Hero';
import FeaturedCollections from '@/components/home/FeaturedCollections';
import BestSellers from '@/components/home/BestSellers';
import SocialMediaSection from '@/components/home/SocialMediaSection';
import CTASection from '@/components/home/CTASection';

export default function Home() {
  return (
    <>
      <Hero />
      <FeaturedCollections />
      <BestSellers />
      <SocialMediaSection />
      <CTASection />
    </>
  );
}
