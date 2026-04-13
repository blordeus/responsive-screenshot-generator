import Image from "next/image";
import Link from "next/link";
import { navLinks } from "@/data/nav";

type MobileMenuProps = {
  isOpen: boolean;
  onClose: () => void;
};

export default function MobileMenu({
  isOpen,
  onClose,
}: MobileMenuProps) {
  if (!isOpen) return null;

  return (
    <>
      <div
        className="fixed inset-0 top-18 z-40 bg-black/50 md:hidden"
        onClick={onClose}
      />

      <div className="absolute left-0 top-full z-50 w-full bg-white px-8 pb-8 pt-8 shadow-[0_40px_75px_rgba(0,0,0,0.5)] md:hidden">
        <nav>
          <ul className="flex flex-col items-center gap-5 text-[15px] font-bold uppercase tracking-[2.5px] text-black">
            {navLinks.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={onClose}
                  className="transition hover:opacity-60"
                >
                  {link.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="mt-5 h-px bg-black/25" />

        <Link
          href="#"
          onClick={onClose}
          className="mt-5 inline-flex w-full items-center justify-center bg-black px-6 py-4 text-[15px] font-bold uppercase tracking-[2.5px] text-white transition hover:bg-black/85"
        >
          Get an invite
        </Link>
      </div>
    </>
  );
}