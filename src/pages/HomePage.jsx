import SEO from "../components/SEO";
import Hero from "../components/Hero";
import BrandStatement from "../components/BrandStatement";
import FeaturedProducts from "../components/FeaturedProducts";
import WhyPersonalBest from "../components/WhyPersonalBest";
import ShopByGender from "../components/ShopByGender";
import Community from "../components/Community";
import SocialProof from "../components/SocialProof";

export default function HomePage() {
  return (
    <>
      <SEO
        title="Personal Best Sportswear | Performance Activewear for Movement"
        description="Performance-driven activewear designed for movement, comfort, and everyday training. Shop men's and women's sportswear built for those who show up."
      />
      <Hero />
      <BrandStatement />
      <FeaturedProducts />
      <WhyPersonalBest />
      <ShopByGender />
      <SocialProof />
      <Community />
    </>
  );
}
