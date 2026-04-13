import FeatureSplitSection from "@/app/components/shared/feature-split-section";
import PricingTable from "@/app/components/pricing/pricing-card";
import CompareTable from "@/app/components/pricing/compare-table";
import CTA from "@/app/components/shared/cta";
import PageHero from "@/app/components/shared/page-hero";

export default function PricingPage() {
  return (
    <main>
      <PageHero
        title="Pricing"
        description="Create a your stories, Photosnap is a platform for photographers and visual storytellers. It’s the simple way to create and share your photos."
        image={{
          desktop: "/assets/images/pricing/desktop/hero.jpg",
          tablet: "/assets/images/pricing/tablet/hero.jpg",
          mobile: "/assets/images/pricing/mobile/hero.jpg",
          alt: "Silhouette photographer at sunset",
        }}
      />

      <PricingTable />
      <CompareTable />
      <CTA />
    </main>
  );
}