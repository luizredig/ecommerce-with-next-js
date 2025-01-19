import Image from "next/image";
import { cn } from "../lib/utils";

interface BannerProps {
  src: string;
  alt: string;
  className?: string;
}

const Banner = ({ src, alt, className }: BannerProps) => {
  return (
    <Image
      src={src}
      alt={alt}
      width={0}
      height={0}
      sizes="100vw object-contain"
      priority
      className={cn(className)}
    />
  );
};

export default Banner;
