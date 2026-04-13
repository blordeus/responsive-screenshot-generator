import FeatureSplitSection from "@/app/components/shared/feature-split-section";
import FeatureGrid from "@/app/components/features/features-grid";
import CTA from "@/app/components/layout/cta-banner";

export default function FeaturesPage() {
  return (
    <main>
      <FeatureSplitSection
        title="Features"
        description="We make sure all of our features..."
        image={{
          desktop: "/assets/images/features/desktop/hero.jpg",
          tablet: "/assets/images/features/tablet/hero.jpg",
          mobile: "/assets/images/features/mobile/hero.jpg",
          alt: "Camera close up",
        }}
        dark
      />

      <FeatureGrid extended />

      <CTA />
    </main>
  );
}