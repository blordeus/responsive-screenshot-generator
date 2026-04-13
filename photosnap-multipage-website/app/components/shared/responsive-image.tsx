import Image from "next/image";

type ResponsiveImageProps = {
  desktop: string;
  tablet: string;
  mobile: string;
  alt: string;
  priority?: boolean;
};

export default function ResponsiveImage({
  desktop,
  tablet,
  mobile,
  alt,
  priority = false,
}: ResponsiveImageProps) {
  return (
    <picture className="relative block w-full h-full">
      <source media="(min-width: 1024px)" srcSet={desktop} />
      <source media="(min-width: 768px)" srcSet={tablet} />
      <Image
        src={mobile}
        alt={alt}
        fill
        sizes="(min-width: 1024px) 50vw, (min-width: 768px) 50vw, 100vw"
        priority={priority}
        className="object-cover"
      />
    </picture>
  );
}
