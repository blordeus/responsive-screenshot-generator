import Container from "@/app/components/ui/container";
import { navLinks } from "@/data/nav";
import Link from "next/link";
import Image from "next/image";
import Button from "@/app/components/ui/button";
import MobileMenu from "@/components/layout/mobile-menu";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";

export default function Header() {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    setIsOpen(false);
  }, [pathname]);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "";
    }

    return () => {
      document.body.style.overflow = "";
    };
  }, [isOpen]);

  return (
    <header className="sticky top-0 z-[60] bg-white">
      <div className="relative mx-auto flex h-[72px] max-w-[1440px] items-center justify-between px-6 md:h-20 md:px-10 lg:px-[165px]">
        <Link href="/">
          <Image
            src="/assets/shared/logo.svg"
            alt="Photosnap"
            width={170}
            height={16}
            className="h-4 w-auto"
          />
        </Link>

        <nav className="hidden md:block">
          <ul className="flex items-center gap-[37px]">
            {navLinks.map((link) => {
              const isActive = pathname === link.href;

              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className={`text-[12px] font-bold uppercase tracking-[2px] transition ${
                      isActive ? "text-black" : "text-black hover:opacity-60"
                    }`}
                  >
                    {link.label}
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <Link
          href="#"
          className="hidden bg-black px-6 py-3 text-[12px] font-bold uppercase tracking-[2px] text-white transition hover:bg-black/85 md:inline-flex"
        >
          Get an invite
        </Link>

        <button
          type="button"
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          onClick={() => setIsOpen((prev) => !prev)}
          className="inline-flex md:hidden"
        >
          <Image
            src={isOpen ? "/assets/shared/close.svg" : "/assets/shared/hamburger.svg"}
            alt=""
            width={20}
            height={20}
            className="h-4 w-5"
          />
        </button>

        <MobileMenu isOpen={isOpen} onClose={() => setIsOpen(false)} />
      </div>
    </header>
  );
}