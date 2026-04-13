import Button from "@/app/components/ui/button";
import ResponsiveImage from "@/app/components/shared/responsive-image";
import { cn } from "@/lib/utils";

type FeatureSplitSectionProps = {
  title: string;
  description: string;
  image: {
    desktop: string;
    tablet: string;
    mobile: string;
    alt: string;
  };
  imageFirst?: boolean;
  dark?: boolean;
  priority?: boolean;
};

export default function FeatureSplitSection({
  title,
  description,
  image,
  imageFirst = false,
  dark = false,
  priority = false,
}: FeatureSplitSectionProps) {
  return (
    <section className="grid md:grid-cols-2">
      <div className={cn("relative min-h-[300px]", imageFirst ? "md:order-2" : "md:order-1")}>
        <ResponsiveImage {...image} priority={priority} />
      </div>

      <div
        className={cn(
          "flex items-center px-7 py-18 md:px-14 lg:px-28",
          dark ? "bg-black text-white" : "bg-white text-black",
          imageFirst ? "md:order-1" : "md:order-2"
        )}
      >
        <div className="max-w-[387px]">
          <h2 className="text-heading-xl uppercase">{title}</h2>
          <p
            className={cn(
              "mt-4 text-body",
              dark ? "text-white/60" : "text-black/60"
            )}
          >
            {description}
          </p>

          <Button
            variant={dark ? "ghost" : "ghost"}
            className={cn(
              "mt-6",
              dark ? "text-white hover:opacity-70" : "text-black hover:opacity-70"
            )}
          >
            Get an invite
          </Button>
        </div>
      </div>
    </section>
  );
}