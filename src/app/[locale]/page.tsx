import { setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/Hero";
import { MarqueeTicker } from "@/components/home/MarqueeTicker";
import { ProductGrid } from "@/components/home/ProductGrid";
import { HowIWork } from "@/components/home/HowIWork";
import { WhyMe } from "@/components/home/WhyMe";
import { Testimonials } from "@/components/home/Testimonials";
import { CTABanner } from "@/components/home/CTABanner";

type Props = {
  params: Promise<{ locale: string }>;
};

export default async function HomePage({ params }: Props) {
  const { locale } = await params;
  setRequestLocale(locale);

  return (
    <>
      <Hero />
      <MarqueeTicker />
      <ProductGrid />
      <HowIWork />
      <WhyMe />
      <Testimonials />
      <CTABanner />
    </>
  );
}
