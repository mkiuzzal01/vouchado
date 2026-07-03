import Image from "next/image";
import coverImage from "@/public/hero/Rectangle 61.png";

export default function CoverImage() {
  return (
    <div className="relative w-full aspect-3/1 sm:aspect-4/1 md:aspect-5/1 rounded-3xl overflow-hidden shadow-sm bg-gray-100">
      <Image
        src={coverImage}
        alt="Profile Banner"
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
    </div>
  );
}
