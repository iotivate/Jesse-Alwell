import { SiteHeader } from "@/components/sections/site-header";
import { Hero } from "@/components/sections/hero";
import { FeaturedWorks } from "@/components/sections/featured-works";
import { About } from "@/components/sections/about";
import { Collections } from "@/components/sections/collections";
import { ShopTeaser } from "@/components/sections/shop-teaser";
import { Press } from "@/components/sections/press";
import { Footer } from "@/components/sections/footer";

export default function Home() {
  return (
    <>
      <SiteHeader overlay />
      <Hero />
      <FeaturedWorks />
      <About />
      <Collections />
      <ShopTeaser />
      <Press />
      <Footer />
    </>
  );
}
