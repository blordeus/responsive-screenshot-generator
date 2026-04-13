import Image from "next/image";
import SocialIcons from "@/app/components/shared/social-icons";
import Container from "@/app/components/ui/container";
import Link from "next/link";
import Button from "@/app/components/ui/button";
import { navLinks } from "@/data/nav";

export default function Footer() {
  return (
    <footer className="bg-black text-white">
      <div className="mx-auto flex max-w-[1440px] flex-col gap-12 px-8 py-14 md:px-10 md:py-16 lg:grid lg:grid-cols-[auto_1fr_auto] lg:grid-rows-[auto_1fr] lg:gap-x-28 lg:gap-y-20 lg:px-[112px]">
        <Link href="/" className="lg:col-start-1 lg:row-start-1">
          <Image
            src="/assets/shared/logo.svg"
            alt="Photosnap"
            width={170}
            height={16}
            className="h-4 w-auto"
          />
        </Link>

        <div className="lg:col-start-1 lg:row-start-2">
          <SocialIcons />
        </div>

        <nav className="lg:col-start-2 lg:row-span-2 lg:row-start-1">
          <ul className="flex flex-col gap-5 text-[12px] font-bold uppercase tracking-[2px] md:flex-row md:gap-[26px] lg:flex-col lg:gap-5">
            <li>
              <Link href="/" className="transition hover:opacity-60">
                Home
              </Link>
            </li>

            {navLinks.map((link) => (
              <li key={link.href}>
                <Link href={link.href} className="transition hover:opacity-60">
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <Link
          href="#"
          className="group inline-flex items-center gap-4 self-start text-[12px] font-bold uppercase tracking-[2px] lg:col-start-3 lg:row-start-1 lg:justify-self-end"
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

        <p className="text-[15px] leading-[25px] text-white/50 lg:col-start-3 lg:row-start-2 lg:self-end lg:justify-self-end">
          Copyright 2019. All Rights Reserved
        </p>
      </div>
    </footer>
  );
}