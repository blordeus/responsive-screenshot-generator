import Image from "next/image";
import Link from "next/link";

const socials = [
  { name: "Facebook", href: "#", icon: "/assets/icons/facebook.svg" },
  { name: "YouTube", href: "#", icon: "/assets/icons/youtube.svg" },
  { name: "Twitter", href: "#", icon: "/assets/icons/twitter.svg" },
  { name: "Pinterest", href: "#", icon: "/assets/icons/pinterest.svg" },
  { name: "Instagram", href: "#", icon: "/assets/icons/instagram.svg" },
];

export default function SocialIcons() {
  return (
    <div className="flex items-center gap-[13px]">
      {socials.map((social) => (
        <Link
          key={social.name}
          href={social.href}
          aria-label={social.name}
          className="transition hover:opacity-70"
        >
          <Image
            src={social.icon}
            alt=""
            width={20}
            height={20}
            className="h-5 w-5"
          />
        </Link>
      ))}
    </div>
  );
}