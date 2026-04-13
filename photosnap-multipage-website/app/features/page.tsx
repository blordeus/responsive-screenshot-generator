import FeatureSplitSection from "@/app/components/shared/feature-split-section";
import FeatureGrid from "@/app/components/features/features-grid";
import CTA from "@/app/components/shared/cta";
import PageHero from "@/app/components/shared/page-hero";

export default function FeaturesPage() {
  return (
    <main>
      <PageHero
        title="Features"
        description="We make sure all of our features are designed to be loved by every aspiring and even professional photographers who wanted to share their stories."
        image={{
          desktop: "/assets/images/features/desktop/hero.jpg",
          tablet: "/assets/images/features/tablet/hero.jpg",
          mobile: "/assets/images/features/mobile/hero.jpg",
          alt: "Close-up of a person holding a camera outdoors",
        }}
      />

      <FeatureGrid extended />

      <CTA />
    </main>
  );
}