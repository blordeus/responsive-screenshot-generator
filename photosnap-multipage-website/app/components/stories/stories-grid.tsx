import StoryCard from "@/app/components/stories/story-card";
import { stories } from "@/data/stories";

type StoriesGridProps = {
  limit?: number;
};

export default function StoriesGrid({ limit }: StoriesGridProps) {
  const items = limit ? stories.slice(0, limit) : stories;

  return (
    <section>
      <div className="grid sm:grid-cols-2 xl:grid-cols-4">
        {items.map((story) => (
          <StoryCard
            key={`${story.title}-${story.author}`}
            title={story.title}
            author={story.author}
            date={story.date}
            image={story.image}
          />
        ))}
      </div>
    </section>
  );
}