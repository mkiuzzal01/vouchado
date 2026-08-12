import Image from "next/image";
import coverImage from "@/public/hero/Hero Section (2).png";
import { getDictionary } from "@/app/[lang]/dictionaries";

interface Props {
  coverImageUrl: string;
  t?: Awaited<ReturnType<typeof getDictionary>>;
}

export default function CoverImage({ coverImageUrl, t }: Props) {
  return (
    <div className="relative w-full aspect-3/1 sm:aspect-4/1 md:aspect-5/1 rounded-3xl overflow-hidden shadow-sm bg-gray-100">
      <Image
        src={coverImageUrl || coverImage}
        alt={t?.provider_profile?.profile_banner || "Profile Banner"}
        fill
        sizes="100vw"
        className="object-cover"
        priority
      />
    </div>
  );
}
