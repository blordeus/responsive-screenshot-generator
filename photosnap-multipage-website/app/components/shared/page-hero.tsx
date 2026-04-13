import Image from "next/image";

type PageHeroProps = {
  title: string;
  description: string;
  image: {
    desktop: string;
    tablet: string;
    mobile: string;
    alt: string;
  };
};

export default function PageHero({ title, description, image }: PageHeroProps) {
  return (
    <section className="bg-black">
      <div className="grid md:grid-cols-[495px_1fr] lg:grid-cols-[610px_1fr]">
        <div className="relative order-2 bg-black px-7 py-[72px] text-white md:order-1 md:flex md:items-center md:px-[54px] md:py-[173px] lg:px-[112px]">
          <div className="absolute left-0 top-0 h-[6px] w-32 bg-[image:var(--gradient-6)] md:top-1/2 md:h-[304px] md:w-[6px] md:-translate-y-1/2" />

          <div className="max-w-[387px]">
            <h1 className="text-[32px] font-bold uppercase leading-[1.1] tracking-[3.33px] md:text-[40px] md:tracking-[4.17px]">
              {title}
            </h1>

            <p className="mt-4 text-[15px] leading-[25px] text-white/60">
              {description}
            </p>
          </div>
        </div>

        <div className="relative order-1 min-h-[294px] md:order-2 md:min-h-[490px] lg:min-h-[490px]">
          <picture>
            <source media="(min-width: 1024px)" srcSet={image.desktop} />
            <source media="(min-width: 768px)" srcSet={image.tablet} />
            <Image
              src={image.mobile}
              alt={image.alt}
              fill
              priority
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </picture>
        </div>
      </div>
    </section>
  );
}