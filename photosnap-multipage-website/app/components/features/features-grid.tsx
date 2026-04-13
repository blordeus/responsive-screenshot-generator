import Image from "next/image";
import { features } from "@/data/features";

type FeatureGridProps = {
  extended?: boolean;
};

export default function FeatureGrid({ extended = false }: FeatureGridProps) {
  const items = extended ? features : features.slice(0, 3);

  return (
    <section className="bg-[#f5f5f5] px-8 py-20 md:px-10 md:py-28 lg:px-20 lg:py-36">
      <div
        className={`mx-auto grid max-w-[1110px] gap-x-8 gap-y-14 ${
          extended
            ? "md:grid-cols-2 lg:grid-cols-3"
            : "md:grid-cols-3"
        }`}
      >
        {items.map((feature) => (
          <article
            key={feature.title}
            className="mx-auto flex max-w-[350px] flex-col items-center text-center"
          >
            <div className="mb-12 flex h-[72px] items-center justify-center">
              <Image
                src={feature.icon}
                alt=""
                width={72}
                height={72}
                className="h-auto w-auto"
              />
            </div>

            <h3 className="text-[18px] font-bold leading-[25px] text-black">
              {feature.title}
            </h3>

            <p className="mt-4 text-[15px] leading-[25px] text-black/60">
              {feature.description}
            </p>
          </article>
        ))}
      </div>
    </section>
  );
}