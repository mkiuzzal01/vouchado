"use client";

import { useEffect, useState, useMemo } from "react";
import Image from "next/image";
import { useDispatch } from "react-redux";
import { useAppSelector } from "@/redux/hooks/globalhooks";
import {
  ChevronLeft,
  Star,
  Smartphone,
  Zap,
  Heart,
  MessageSquare,
  Lock,
} from "lucide-react";

import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";

import { Badge } from "@/components/ui/badge";
import Container from "../../shared/Container";
import Includes from "@/app/[lang]/(main)/view/__componets/Includes";
import ProductLocation from "@/app/[lang]/(main)/view/__componets/ProductLocation";
import ItemCounter from "@/app/[lang]/(main)/cart/__components/ItemCounter";
import CheckMark from "../../icons/CheckMark";
import Mobile from "../../icons/Mobile";
import InstantConfirm from "../../icons/InstantConfirm";
import Batch from "../../icons/Batch";
import {
  getPreviewUrl,
  getPreviewUrls,
  revokePreviewUrls,
  isBlobUrl,
} from "../../utils/imagePreview";
import { setStep } from "@/redux/features/provider/deal.slice";

type TabType = "overview" | "included";

const FALLBACK_MAIN_IMAGE =
  "https://images.unsplash.com/photo-1566073771259-6a8506099945?w=1200&q=80";

const parsePoints = (input: unknown): string[] => {
  if (!input) return [];
  if (Array.isArray(input)) {
    return input.map((p) => String(p).trim()).filter(Boolean);
  }
  if (typeof input === "string") {
    return input
      .split(",")
      .map((p) => p.trim())
      .filter(Boolean);
  }
  return [];
};

export default function Preview() {
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const dispatch = useDispatch();
  const { dealInfo, media, dealDetails, overview } = useAppSelector(
    (state) => state.deal,
  );
  const [activeTab, setActiveTab] = useState<TabType>("overview");
  const [coverPreviewUrl, setCoverPreviewUrl] = useState<string>("");
  const [galleryPreviewUrls, setGalleryPreviewUrls] = useState<string[]>([]);

  const guarantees = useMemo(
    () => [
      { label: "Instant Confirmation", icon: <CheckMark size={14} /> },
      { label: "Mobile Ticket", icon: <Mobile size={14} /> },
      {
        label: "Vouchado Guarantee: always safe 20% or more",
        icon: <InstantConfirm size={14} />,
      },
    ],
    [],
  );

  const allImages = useMemo(() => {
    const images = [];
    if (coverPreviewUrl) images.push(coverPreviewUrl);
    if (galleryPreviewUrls.length > 0) images.push(...galleryPreviewUrls);

    if (images.length === 0) images.push(FALLBACK_MAIN_IMAGE);
    return images;
  }, [coverPreviewUrl, galleryPreviewUrls]);

  useEffect(() => {
    if (!media) return;

    const coverUrl = getPreviewUrl(media?.coverImage);
    const galleryUrls = getPreviewUrls(media?.galleryImages);

    setCoverPreviewUrl(coverUrl);
    setGalleryPreviewUrls(galleryUrls);
  }, [media]);

  useEffect(() => {
    const currentCover = coverPreviewUrl;
    const currentGallery = galleryPreviewUrls;

    return () => {
      const urlsToRevoke = [currentCover, ...currentGallery].filter(
        (url) => url && isBlobUrl(url),
      );

      if (urlsToRevoke.length > 0) {
        revokePreviewUrls(urlsToRevoke);
      }
    };
  }, []);

  const handlePublishPayload = () => {
    console.log("Publishing Final State:", {
      dealInfo,
      media,
      dealDetails,
      overview,
    });
  };

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {dealDetails?.deal_name ||
                "US Olympic & Paralympic Museum Ticket"}
            </h1>
            <p className="text-base font-medium text-slate-600 leading-relaxed">
              {dealDetails?.shortDescription ||
                "Experience America's Olympic history through interactive exhibits."}
            </p>
          </div>

          <div className="flex items-center gap-4 pt-1.5">
            {guarantees.map((guarantee) => (
              <div key={guarantee.label} className="flex items-center gap-1.5">
                {guarantee.icon}
                <span className="text-[#454F5B] font-normal">
                  {guarantee.label}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 preview-swiper-container">
            <div className="space-y-3">
              <Swiper
                spaceBetween={10}
                navigation
                modules={[FreeMode, Navigation, Thumbs]}
                thumbs={{
                  swiper:
                    thumbsSwiper && !thumbsSwiper.destroyed
                      ? thumbsSwiper
                      : null,
                }}
                className="rounded-2xl overflow-hidden"
              >
                {allImages?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                      <Image
                        src={image}
                        alt={`Photo ${index + 1}`}
                        fill
                        className="object-cover"
                        sizes="(max-width: 768px) 100vw, 700px"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
              <Swiper
                onSwiper={setThumbsSwiper}
                modules={[FreeMode, Thumbs]}
                watchSlidesProgress
                freeMode
                spaceBetween={12}
                slidesPerView={4}
                className="thumb-swiper"
              >
                {allImages.map((image) => (
                  <SwiperSlide key={image}>
                    <div className="relative aspect-4/3 rounded-xl overflow-hidden border-2 border-transparent cursor-pointer">
                      <Image
                        src={image}
                        alt="Thumbnail"
                        fill
                        className="object-cover"
                        sizes="100px"
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>
            </div>
          </div>

          <div className="flex gap-6 font-bold">
            {(["overview", "included"] as TabType[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-3 capitalize transition-all relative font-bold ${
                  activeTab === tab
                    ? "text-[#29b6be] after:absolute after:bottom-0 after:left-0 after:w-full after:h-[2px] after:bg-[#29b6be]"
                    : "text-slate-400 hover:text-slate-600"
                }`}
              >
                {tab === "included" ? "What's Included" : tab}
              </button>
            ))}
          </div>
          <div className="pt-2">
            {activeTab === "overview" && (
              <div className="space-y-6 animate-in fade-in duration-300">
                <div className="space-y-2">
                  <h2 className="text-xl font-bold text-slate-900">Overview</h2>
                  <p className="text-slate-600 text-base leading-relaxed whitespace-pre-line">
                    {dealDetails?.shortDescription}
                  </p>
                </div>

                <div className="space-y-3 pt-2">
                  <h3 className="text-base font-bold text-slate-900 tracking-tight">
                    Highlights
                  </h3>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    {parsePoints(overview?.highlightedPoints).map(
                      (highlight, idx) => (
                        <div
                          key={idx}
                          className="flex items-start bg-slate-50/60 border border-slate-100 rounded-xl p-4 gap-3"
                        >
                          <div className="mt-0.5 shrink-0">
                            <Batch />
                          </div>
                          <span className="text-sm text-slate-700 font-medium leading-snug">
                            {highlight}
                          </span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            )}

            {activeTab === "included" && (
              <div>
                <Includes
                  description={overview?.description}
                  included={parsePoints(overview?.includedPoints || [])}
                  notIncluded={parsePoints(overview?.notIncludedPoints || [])}
                />
              </div>
            )}
          </div>
        </div>

        <div className="lg:col-span-4 space-y-6 lg:sticky lg:top-6">
          <div className="rounded-2xl p-6 space-y-5">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                {dealInfo.voucher_name || "Single Day Ticket"}
              </h3>
              <div className="flex items-center gap-1 text-xs text-slate-500 font-medium">
                <div className="flex text-amber-400">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      size={12}
                      className="fill-amber-400 text-amber-400"
                    />
                  ))}
                </div>
                <span className="font-bold text-slate-700 ml-1">4.8</span>
                <span>(12,500+ reviews)</span>
              </div>
            </div>

            <div className="space-y-0.5 pt-1">
              {dealInfo.regularPrice && (
                <span className="text-xs line-through text-slate-400 font-semibold block">
                  € {dealInfo.regularPrice}
                </span>
              )}
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  € {dealInfo.discountedPrice || "124.50"}
                </span>
                <Badge className="bg-cyan-50 text-[#29b6be] hover:bg-cyan-50 font-bold border border-cyan-100 rounded-md py-0.5 px-1.5 text-xs shadow-sm">
                  Save 17%
                </Badge>
              </div>
            </div>

            <div className="space-y-3 pt-4 border-t border-slate-100 text-xs font-semibold text-slate-700">
              <div className="flex items-center gap-2.5">
                <Zap size={15} className="text-[#29b6be] fill-cyan-50/50" />
                <span>Instant Confirmation</span>
              </div>
              <div className="flex items-center gap-2.5">
                <Smartphone size={15} className="text-[#29b6be]" />
                <span>Mobile Ticket</span>
              </div>
            </div>

            <div className="flex justify-end pt-1">
              <ItemCounter />
            </div>

            <div className="space-y-2.5 pt-2">
              <button
                type="button"
                disabled
                onClick={handlePublishPayload}
                className="w-full h-11 bg-[#C4CDD5] text-white font-bold rounded-full text-sm"
              >
                Book now
              </button>
              <button
                type="button"
                className="w-full h-11 border border-slate-200  text-[#C4CDD5] font-bold rounded-full text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <Heart size={15} className="text-[#C4CDD5]" /> Add to wishlist
              </button>
              <button
                type="button"
                className="w-full h-11  border border-slate-200 text-[#C4CDD5] font-bold rounded-full text-sm flex items-center justify-center gap-2 transition-colors"
              >
                <MessageSquare size={15} className="text-[#C4CDD5]" /> Chat with
                seller
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[11px] font-semibold pt-1">
              <Lock size={12} /> Secure checkout
            </div>
          </div>

          <ProductLocation location={overview.location ?? undefined} />
        </div>
      </div>

      <div className="flex justify-between items-center mt-12 pt-6 border-t border-slate-100">
        <button
          type="button"
          onClick={() => dispatch(setStep(4))}
          className="px-5 h-11 border border-slate-200 rounded-full font-bold text-slate-600 bg-white hover:bg-slate-50 text-sm flex items-center gap-1.5"
        >
          <ChevronLeft className="w-4 h-4" /> Back
        </button>
        <button
          type="button"
          onClick={handlePublishPayload}
          className="px-8 h-11 bg-[#29b6be] hover:bg-[#1fa0a7] text-white font-bold rounded-full text-sm "
        >
          Publish Deal
        </button>
      </div>
    </Container>
  );
}
