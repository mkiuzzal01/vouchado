import Image from "next/image";
import coverImage from "@/public/hero/Hero Section (2).png";

interface Props {
  coverImageUrl: string;
}

export default function CoverImage({ coverImageUrl }: Props) {
  return (
    <div className="relative w-full aspect-3/1 sm:aspect-4/1 md:aspect-5/1 rounded-3xl overflow-hidden shadow-sm bg-gray-100">
      <Image
        src={coverImageUrl || coverImage}
        alt="Profile Banner"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
    </div>
  );
}
