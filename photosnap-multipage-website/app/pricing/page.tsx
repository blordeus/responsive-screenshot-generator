import FeatureSplitSection from "@/app/components/shared/feature-split-section";
import PricingTable from "@/app/components/pricing/pricing-card";
import CompareTable from "@/app/components/pricing/compare-table";
import CTA from "@/app/components/layout/cta-banner";

export default function PricingPage() {
  return (
    <main>
      <FeatureSplitSection
        title="Pricing"
        description="Create a your stories..."
        image={{
          desktop: "/assets/images/pricing/desktop/hero.jpg",
          tablet: "/assets/images/pricing/tablet/hero.jpg",
          mobile: "/assets/images/pricing/mobile/hero.jpg",
          alt: "Photographer silhouette",
        }}
        dark
      />

      <PricingTable />
      <CompareTable />

      <CTA />
    </main>
  );
}