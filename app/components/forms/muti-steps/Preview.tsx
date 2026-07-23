"use client";

import { useState, useMemo } from "react";
import Image from "next/image";
import type { Swiper as SwiperType } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import {
  ChevronLeft,
  Star,
  Smartphone,
  Zap,
  Heart,
  MessageSquare,
  Lock,
} from "lucide-react";
import { toast } from "react-toastify";

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
  revokePreviewUrls,
  isBlobUrl,
} from "../../utils/imagePreview";
import {
  resetDealForm,
  setOpenDealModal,
  setStep,
  updateDealStatus,
} from "@/redux/features/deal/deal.slice";
import { useCreateDealMutation } from "@/redux/features/deal/deal.api";
import SelectStatus from "./SelectStatus";
import DealsTerms from "./DealsTerms";

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

const formatToHis = (timeStr: string | undefined): string => {
  if (!timeStr) return "";
  const cleanTime = timeStr.trim().split(" ")[0];
  const parts = cleanTime.split(":");
  return parts.length === 2 ? `${parts[0]}:${parts[1]}:00` : cleanTime;
};

const formatToYmdHis = (dateTimeStr: string | undefined): string => {
  if (!dateTimeStr) return "";
  const spaceSeparated = dateTimeStr.replace("T", " ");
  const parts = spaceSeparated.split(":");
  return parts.length === 2 ? `${spaceSeparated}:00` : spaceSeparated;
};

export default function Preview() {
  const dispatch = useAppDispatch();
  const [thumbsSwiper, setThumbsSwiper] = useState<SwiperType | null>(null);
  const [activeTab, setActiveTab] = useState<TabType>("overview");

  const { dealInfo, media, dealDetails, overview, granted_12_months, status } =
    useAppSelector((state) => state.deal);

  const [createDeal, { isLoading }] = useCreateDealMutation();

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

  // 1. Dynamically compute cover and gallery preview URLs directly from Redux state
  const coverPreviewUrl = useMemo(() => {
    if (!media?.coverImage) return "";
    return typeof media.coverImage === "string"
      ? media.coverImage
      : getPreviewUrl(media.coverImage);
  }, [media?.coverImage]);

  const galleryPreviewUrls = useMemo(() => {
    if (!media?.galleryImages || !Array.isArray(media.galleryImages)) return [];
    return media.galleryImages.map((img) =>
      typeof img === "string" ? img : getPreviewUrl(img),
    );
  }, [media?.galleryImages]);

  // 2. Active Image Pool Configuration
  const allImages = useMemo(() => {
    const images: string[] = [];
    if (coverPreviewUrl) images.push(coverPreviewUrl);
    if (galleryPreviewUrls.length > 0) images.push(...galleryPreviewUrls);
    return images.length === 0 ? [FALLBACK_MAIN_IMAGE] : images;
  }, [coverPreviewUrl, galleryPreviewUrls]);

  // 3. Dynamic Calculation for Savings Badge Percentage Info
  const savingsPercentage = useMemo(() => {
    const regular = Number(dealInfo?.regularPrice);
    const discounted = Number(dealInfo?.discountedPrice);
    if (!regular || !discounted || regular <= discounted) return null;
    return Math.round(((regular - discounted) / regular) * 100);
  }, [dealInfo?.regularPrice, dealInfo?.discountedPrice]);

  const handlePublishPayload = async (targetStatus: "active" | "inactive") => {
    dispatch(updateDealStatus(targetStatus));
    const formData = new FormData();

    try {
      formData.append("deal_name", dealDetails?.deal_name || "");
      formData.append("original_price", String(dealInfo?.regularPrice || 0));
      formData.append(
        "discounted_price",
        String(dealInfo?.discountedPrice || 0),
      );
      formData.append(
        "total_purchase_limit",
        String(dealInfo?.totalPurchaseLimit || 0),
      );
      formData.append(
        "max_purchase_per_customer",
        String(dealInfo?.maxPurchasePerCustomer || 0),
      );
      formData.append("service_title", String(dealInfo?.voucher_name || ""));
      formData.append("short_description", dealDetails?.shortDescription || "");
      formData.append("category_id", dealDetails?.category || "");
      formData.append("child_category_id", dealDetails?.child_category || "");

      formData.append(
        "available_start_time",
        formatToHis(dealDetails?.available_start_time),
      );
      formData.append(
        "available_end_time",
        formatToHis(dealDetails?.available_end_time),
      );
      formData.append(
        "service_end_at",
        formatToYmdHis(dealDetails?.service_end_time),
      );

      formData.append("overview_description", overview?.description || "");
      formData.append(
        "experience_description",
        overview?.includedDescription || "",
      );
      formData.append(
        "visit_location",
        overview?.location?.visit_location || "",
      );
      formData.append("latitude", String(overview?.location?.lat || 0));
      formData.append("longitude", String(overview?.location?.lng || 0));
      formData.append("opening_hours", overview?.openingHours || "");
      formData.append("accessibility_info", overview?.accessibility || "");

      formData.append("guarantee_12_months", String(granted_12_months ? 1 : 0));

      parsePoints(overview?.highlightedPoints).forEach((point) => {
        formData.append("highlight_points[]", point);
      });
      parsePoints(overview?.includedPoints).forEach((point) => {
        formData.append("include_points[]", point);
      });
      parsePoints(overview?.notIncludedPoints).forEach((point) => {
        formData.append("not_include_points[]", point);
      });

      if (Array.isArray(dealDetails?.availableDays)) {
        dealDetails.availableDays.forEach((day: string) =>
          formData.append("days[]", day),
        );
      }
      if (Array.isArray(dealDetails?.availableMonths)) {
        dealDetails.availableMonths.forEach((month: string) =>
          formData.append("months[]", month),
        );
      }

      if (media?.coverImage) {
        formData.append("images[]", media.coverImage);
      }
      if (Array.isArray(media?.galleryImages)) {
        media.galleryImages.forEach((image) =>
          formData.append("images[]", image),
        );
      }

      formData.append("status", targetStatus);

      const res = await createDeal(formData).unwrap();

      if (res?.message) {
        // Safe revocation of Blob URLs only after submission succeeds
        const urlsToRevoke = allImages.filter((url) => isBlobUrl(url));
        if (urlsToRevoke.length > 0) {
          revokePreviewUrls(urlsToRevoke);
        }

        toast.success(res.message);
        dispatch(setOpenDealModal(false));
        dispatch(resetDealForm());
      }
    } catch (error: any) {
      toast.error(
        error?.data?.message || `Failed to set deal to ${targetStatus}.`,
      );
    }
  };

  return (
    <Container>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
        <div className="lg:col-span-8 space-y-6">
          <div className="space-y-2">
            <h1 className="text-2xl md:text-3xl font-bold text-slate-900 tracking-tight">
              {dealDetails?.deal_name || "Untitled Deal"}
            </h1>
            <p className="text-base font-medium text-slate-600 leading-relaxed">
              {dealDetails?.shortDescription || "No description provided."}
            </p>
          </div>

          <div className="flex flex-wrap items-center gap-4 pt-1.5">
            {guarantees.map((guarantee) => (
              <div key={guarantee.label} className="flex items-center gap-1.5">
                {guarantee.icon}
                <span className="text-[#454F5B] text-sm font-normal">
                  {guarantee.label}
                </span>
              </div>
            ))}
          </div>

          <div className="space-y-3 preview-swiper-container">
            <Swiper
              key={allImages.length}
              observer={true}
              observeParents={true}
              spaceBetween={10}
              navigation
              modules={[FreeMode, Navigation, Thumbs]}
              thumbs={{
                swiper:
                  thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
              }}
              className="rounded-2xl overflow-hidden"
            >
              {allImages.map((image, index) => (
                <SwiperSlide key={`main-${image}-${index}`}>
                  <div className="relative aspect-square w-full rounded-2xl overflow-hidden bg-gray-100 border border-gray-100">
                    <Image
                      src={image}
                      alt={`Deal gallery detail view ${index + 1}`}
                      fill
                      priority={index === 0}
                      unoptimized={isBlobUrl(image)}
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 700px"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>

            <Swiper
              key={`thumbs-${allImages.length}`}
              observer={true}
              observeParents={true}
              onSwiper={setThumbsSwiper}
              modules={[FreeMode, Thumbs]}
              watchSlidesProgress
              freeMode
              spaceBetween={12}
              slidesPerView={4}
              className="thumb-swiper"
            >
              {allImages.map((image, index) => (
                <SwiperSlide key={`thumb-${image}-${index}`}>
                  <div className="relative aspect-square rounded-xl overflow-hidden border-2 border-transparent cursor-pointer">
                    <Image
                      src={image}
                      alt={`Thumbnail grid selector view ${index + 1}`}
                      fill
                      unoptimized={isBlobUrl(image)}
                      className="object-cover"
                      sizes="100px"
                    />
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>

          <div className="flex gap-6 font-bold border-b border-slate-100">
            {(["overview", "included"] as TabType[]).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveTab(tab)}
                className={`pb-3 capitalize transition-all relative font-bold text-sm ${
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
            {activeTab === "overview" ? (
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
            ) : (
              <div className="animate-in fade-in duration-300">
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
          <div className="rounded-2xl p-6 border border-slate-100 bg-white space-y-5 shadow-sm">
            <div className="space-y-1">
              <h3 className="text-lg font-bold text-slate-900 tracking-tight">
                {dealInfo?.voucher_name || "Single Day Ticket"}
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
              {dealInfo?.regularPrice && (
                <span className="text-xs line-through text-slate-400 font-semibold block">
                  € {dealInfo.regularPrice}
                </span>
              )}
              <div className="flex items-center gap-2">
                <span className="text-3xl font-black text-slate-900 tracking-tight">
                  € {dealInfo?.discountedPrice || "124.50"}
                </span>
                {savingsPercentage && (
                  <Badge className="bg-cyan-50 text-[#29b6be] hover:bg-cyan-50 font-bold border border-cyan-100 rounded-md py-0.5 px-1.5 text-xs shadow-sm">
                    Save {savingsPercentage}%
                  </Badge>
                )}
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
                className="w-full h-11 bg-[#C4CDD5] text-white font-bold rounded-full text-sm disabled:cursor-not-allowed"
              >
                Book now
              </button>
              <button
                type="button"
                className="w-full h-11 border border-slate-200 text-[#C4CDD5] font-bold rounded-full text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <Heart size={15} className="text-[#C4CDD5]" /> Add to wishlist
              </button>
              <button
                type="button"
                className="w-full h-11 border border-slate-200 text-[#C4CDD5] font-bold rounded-full text-sm flex items-center justify-center gap-2 hover:bg-slate-50 transition-colors"
              >
                <MessageSquare size={15} className="text-[#C4CDD5]" /> Chat with
                seller
              </button>
            </div>

            <div className="flex items-center justify-center gap-1.5 text-slate-400 text-[11px] font-semibold pt-1">
              <Lock size={12} /> Secure checkout
            </div>
          </div>

          <ProductLocation location={overview?.location ?? undefined} />
        </div>
      </div>

      <div className="flex justify-between items-center mt-12 pt-6 border-t border-slate-100">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={() => dispatch(setStep(4))}
            className="px-5 h-11 border border-slate-200 rounded-full font-bold text-slate-600 bg-white hover:bg-slate-50 text-sm flex items-center gap-1.5 transition-colors"
          >
            <ChevronLeft className="w-4 h-4" /> Back
          </button>
          <DealsTerms />
        </div>

        <div className="flex items-center gap-3">
          <SelectStatus />
          {status === "inactive" ? (
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handlePublishPayload("inactive")}
              className="px-8 h-11 bg-[#29b6be] hover:bg-[#1fa0a7] text-white font-bold rounded-full text-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Drafting..." : "Draft Deal"}
            </button>
          ) : (
            <button
              type="button"
              disabled={isLoading}
              onClick={() => handlePublishPayload("active")}
              className="px-8 h-11 bg-[#29b6be] hover:bg-[#1fa0a7] text-white font-bold rounded-full text-sm transition-colors disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isLoading ? "Publishing..." : "Publish Deal"}
            </button>
          )}
        </div>
      </div>
    </Container>
  );
}
