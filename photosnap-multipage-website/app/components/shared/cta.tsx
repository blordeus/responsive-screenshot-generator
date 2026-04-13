import Image from "next/image";
import Link from "next/link";

export default function CTA() {
  return (
    <section className="relative overflow-hidden bg-black text-white">
      <Image
        src="/assets/shared/bg-beta.jpg"
        alt=""
        fill
        sizes="100vw"
        className="object-cover"
      />

      <div className="absolute left-0 top-0 h-full w-[6px] bg-[image:var(--gradient-6)] md:w-[6px]" />

      <div className="relative z-10 mx-auto flex max-w-[1440px] flex-col gap-6 px-8 py-16 md:flex-row md:items-center md:justify-between md:px-10 md:py-[68px] lg:px-[112px]">
        <h2 className="max-w-[400px] text-[32px] font-bold uppercase leading-[1.1] tracking-[3.33px] md:text-[40px] md:tracking-[4.17px]">
          We&apos;re in beta. Get your invite today!
        </h2>

        <Link
          href="#"
          className="group inline-flex items-center gap-4 self-start text-[12px] font-bold uppercase tracking-[2px]"
        >
          <span>Get an invite</span>
          <Image
            src="/assets/shared/arrow.svg"
            alt=""
            width={42}
            height={14}
            className="transition duration-300 group-hover:translate-x-1"
          />
        </Link>
      </div>
    </section>
  );
}