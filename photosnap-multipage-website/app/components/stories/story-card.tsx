import Image from "next/image";
import Link from "next/link";

type StoryCardProps = {
  title: string;
  author: string;
  date?: string;
  image: {
    desktop: string;
    tablet: string;
    mobile: string;
    alt: string;
  };
};

export default function StoryCard({
  title,
  author,
  date,
  image,
}: StoryCardProps) {
  return (
    <Link
      href="#"
      className="group relative block min-h-[375px] overflow-hidden bg-black text-white md:min-h-[500px]"
    >
      <picture>
        <source media="(min-width: 1024px)" srcSet={image.desktop} />
        <source media="(min-width: 768px)" srcSet={image.tablet} />
        <Image
          src={image.mobile}
          alt={image.alt}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 50vw, 100vw"
          className="object-cover opacity-90 transition duration-500 group-hover:scale-105"
        />
      </picture>

      <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-transparent" />

      <div className="absolute inset-x-0 bottom-0 z-10 p-8">
        {date ? (
          <p className="mb-1 text-[13px] leading-[17px]">{date}</p>
        ) : null}

        <h3 className="text-[18px] font-bold leading-[25px]">{title}</h3>
        <p className="mt-1 text-[13px] leading-[17px]">by {author}</p>

        <div className="mt-4 h-px bg-white/25" />

        <div className="mt-5 flex items-center justify-between gap-4">
          <span className="text-[12px] font-bold uppercase tracking-[2px]">
            Read Story
          </span>

          <Image
            src="/assets/shared/arrow.svg"
            alt=""
            width={42}
            height={14}
            className="h-auto w-auto transition duration-300 group-hover:translate-x-1"
          />
        </div>
      </div>

      <div className="absolute inset-x-0 bottom-0 h-1 origin-left scale-x-0 bg-[image:var(--gradient-6)] transition duration-300 group-hover:scale-x-100" />
    </Link>
  );
}