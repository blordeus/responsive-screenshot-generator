import Link from "next/link";
import Image from "next/image";
import { cn } from "@/lib/utils";

type Props = {
  children: React.ReactNode;
  href?: string;
  variant?: "dark" | "light" | "ghost";
  className?: string;
};

export default function Button({
  children,
  href = "#",
  variant = "dark",
  className,
}: Props) {
  return (
    <Link
      href={href}
      className={cn(
        "group inline-flex items-center gap-4 text-sm-bold transition",
        variant === "dark" &&
          "bg-black px-6 py-3 text-white hover:bg-zinc-800",
        variant === "light" &&
          "bg-white px-6 py-3 text-black hover:bg-gray-200",
        variant === "ghost" &&
          "text-black hover:opacity-60",
        className
      )}
    >
      <span>{children}</span>

      <Image
        src="/assets/shared/arrow.svg"
        alt=""
        width={16}
        height={12}
        className="transition group-hover:translate-x-1"
      />
    </Link>
  );
}