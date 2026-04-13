import { stories } from "@/data/stories";
import StoryCard from "@/app/components/stories/story-card";
import StoriesHero from "@/app/components/stories/stories-hero";
import StoriesGrid from "@/app/components/stories/stories-grid";
import CTA from "@/app/components/shared/cta";

export default function StoriesPage() {
  return (
    <main>
      <StoriesHero />
      <StoriesGrid />
      <CTA />
    </main>
  );
}