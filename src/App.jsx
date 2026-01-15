import SEO from "./components/SEO";
import Navigation from "./components/Navigation";
import Hero from "./components/Hero";
import BrandStatement from "./components/BrandStatement";
import FeaturedProducts from "./components/FeaturedProducts";
import WhyPersonalBest from "./components/WhyPersonalBest";
import ShopByGender from "./components/ShopByGender";
import Community from "./components/Community";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <SEO />
      <Navigation />
      <main>
        <Hero />
        <BrandStatement />
        <FeaturedProducts />
        <WhyPersonalBest />
        <ShopByGender />
        <Community />
      </main>
      <Footer />
    </>
  );
}

export default App;
