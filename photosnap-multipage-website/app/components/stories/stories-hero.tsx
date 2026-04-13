import Image from "next/image";
import Link from "next/link";

export default function StoriesHero() {
  return (
    <section className="relative min-h-[317px] overflow-hidden bg-black text-white md:min-h-[650px]">
      <picture className="absolute inset-0">
        <source
          media="(min-width: 1024px)"
          srcSet="/assets/images/stories/desktop/moon-of-appalacia.jpg"
        />
        <source
          media="(min-width: 768px)"
          srcSet="/assets/images/stories/tablet/moon-of-appalacia.jpg"
        />
        <Image
          src="/assets/images/stories/mobile/moon-of-appalacia.jpg"
          alt="Moon over a mountain landscape at dusk"
          fill
          priority
          sizes="100vw"
          className="object-cover object-center"
        />
      </picture>

      <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-black/35 to-transparent md:bg-black/30" />

      <div className="relative z-10 mx-auto flex min-h-[317px] max-w-[1440px] items-end px-7 py-12 md:min-h-[650px] md:px-10 md:py-28 lg:px-[112px]">
        <div className="max-w-[387px]">
          <p className="text-[12px] font-bold uppercase tracking-[2px]">
            Last Month&apos;s Featured Story
          </p>

          <h1 className="mt-4 text-[32px] font-bold uppercase leading-[1.1] tracking-[3.33px] md:text-[40px] md:tracking-[4.17px]">
            Hazy Full Moon of Appalachia
          </h1>

          <p className="mt-4 text-[13px] leading-[17px] text-white/75">
            March 2nd 2020{" "}
            <span className="text-white">by John Appleseed</span>
          </p>

          <p className="mt-6 text-[15px] leading-[25px] text-white/60">
            The dissected plateau area, while not actually made up of geological
            mountains, is popularly called &quot;mountains,&quot; especially in eastern
            Kentucky and West Virginia, and while the ridges are not high, the
            terrain is extremely rugged.
          </p>

          <Link
            href="#"
            className="group mt-6 inline-flex items-center gap-4 text-[12px] font-bold uppercase tracking-[2px]"
          >
            <span>Read the story</span>
            <Image
              src="/assets/shared/arrow.svg"
              alt=""
              width={42}
              height={14}
              className="transition duration-300 group-hover:translate-x-1"
            />
          </Link>
        </div>
      </div>
    </section>
  );
}