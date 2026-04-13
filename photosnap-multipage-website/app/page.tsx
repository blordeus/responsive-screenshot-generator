import { homeSections } from "@/data/home";
import { stories } from "@/data/stories";

import FeatureSplitSection from "@/app/components/shared/feature-split-section";
import StoryCard from "@/app/components/stories/story-card";
import StoriesGrid from "@/app/components/stories/stories-grid";
import FeatureGrid from "@/app/components/features/features-grid";
import CTA from "@/app/components/layout/cta-banner";

export default function HomePage() {
  return (
    <main>
      <FeatureSplitSection {...homeSections[0]} priority dark />
      <FeatureSplitSection {...homeSections[1]} imageFirst />
      <FeatureSplitSection {...homeSections[2]} />

      <StoriesGrid limit={4} />

      <FeatureGrid />

      <CTA />
    </main>
  );
}