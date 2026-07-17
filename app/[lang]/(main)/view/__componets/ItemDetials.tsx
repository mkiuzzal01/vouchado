"use client";
import Container from "@/app/components/shared/Container";
import { Button } from "@/components/ui/button";
import Contact from "@/app/components/icons/Contact";
import Lock from "@/app/components/icons/Lock";
import Message from "@/app/components/icons/Message";
import Heart from "@/app/components/icons/Heart";
import CounterItem from "@/app/components/shared/CounterItem";
import Check from "@/app/components/icons/Check";
import Mobile from "@/app/components/icons/Mobile";
import CheckMark from "@/app/components/icons/CheckMark";
import Star from "@/app/components/icons/Star";
import Includes from "./Includes";
import Review from "./Review";
import Overview from "./Overview";
import ItemPhotos from "./ItemPhotos";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import { addToCart, removeFromCart } from "@/redux/features/cart/cart.slice";
import { toast } from "react-toastify";
import { useState } from "react";
import SimilarItem from "./SimilarItem";
import ProductLocation from "./ProductLocation";
import PromoSteps from "@/app/components/hero/PromoSteps";
import Link from "next/link";
import Save from "@/app/components/icons/Save";
import InstantConfirm from "@/app/components/icons/InstantConfirm";
import SecurePayment from "@/app/components/icons/SecurePayment";
import { ProductMetrics } from "./ProductMetrics";
import VouchadoCount from "./VouchadoCount";
import GiftVoucher from "@/app/components/icons/GiftVoucher";
import GiftVoucherCart from "./GiftVoucherCart";
import { TService } from "@/redux/types/deals_details";
import { useCreateWishlistMutation } from "@/redux/features/wishlist/wishlist.api";
import { useRouter } from "next/navigation";
import { Loader2 } from "lucide-react";
import { useCreateConversationMutation } from "@/redux/features/conversional/conversional.api";

export const promos = [
  {
    title: "Vouchado Guarantee",
    description: "Always save 20% and MORE!",
    icon: <Save />,
  },
  {
    title: "Instant Confirmation",
    description: "Book & get confirmed instantly.",
    icon: <SecurePayment />,
  },
  {
    title: "Secure Payments",
    description: "100% secure and protected.",
    icon: <InstantConfirm />,
  },
  {
    title: "24/7 Support",
    description: "In person support - no chatboot",
    icon: <Contact />,
  },
];

const tabItems = ["Overview", "What's Included", "Reviews"];

interface Props {
  lang: string;
  details: TService;
}

export default function ItemDetails({ lang, details }: Props) {
  const router = useRouter();
  const [createConversation, { isLoading }] = useCreateConversationMutation();
  const [createWishlist, { isLoading: createWishlistLoading }] =
    useCreateWishlistMutation();
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState("overview");
  const dispatch = useAppDispatch();
  const { items } = useAppSelector((state) => state.cart);

  const productIsInCart = items?.some(
    (item) => item.id === String(details?.deal?.id),
  );

  const handleAddToCart = () => {
    try {
      if (!productIsInCart) {
        dispatch(
          addToCart({
            id: String(details?.deal?.id),
            thumbnail: details?.deal?.images[0].image,
            title: details?.deal?.service_title,
            tagline: details?.deal?.short_description,
            rating: details?.deal?.reviews_avg_rating || 0,
            reviewsCount: details?.deal?.reviews_count || 0,
            location: details?.deal?.longitude,
            currentPrice: parseInt(details?.deal?.discounted_price) || 0,
            originalPrice: parseInt(details?.deal?.original_price) || 0,
            totalQuantity: details?.deal?.max_purchase_per_customer || 1,
            selectedQuantity: quantity,
          }),
        );

        toast.success("Product added to cart");
      } else {
        dispatch(removeFromCart(String(details?.deal?.id)));
        toast.warning("Product removed from cart");
      }
    } catch (error: any) {
      if (!error?.data?.status) {
        toast.error("Please Login to add this item to your cart");
        router.push(`/${lang}/login`);
      }
    }
  };

  const handleAddToWishlist = async () => {
    try {
      const res = await createWishlist({ deal_id: details?.deal?.id }).unwrap();
      if (res?.message) {
        toast.success(res?.message);
        router.refresh();
      }
    } catch (error: any) {
      if (!error?.data?.status) {
        toast.warn("Please Login to add this item to your wishlist");
        router.push(`/${lang}/login?redirect=${window.location.href}`);
      }
    }
  };

  const getSectionId = (tab: string) => {
    if (tab.toLowerCase() === "what's included") return "whats-included";
    return tab.toLowerCase().replace(/\s+/g, "-");
  };

  const handleScrollToSection = (id: string) => {
    setActiveSection(id);
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  const handleChatWithSupport = async () => {
    const data = {
      receiver_id: details?.deal?.provider?.id,
    };
    try {
      const res = await createConversation(data).unwrap();
      if (res?.status) {
        router.push(`/${lang}/chat?id=${res?.data?.id}`);
      }
    } catch (error: any) {
      if (!error?.data?.status) {
        toast.warn("Please Login to chat with support");
        router.push(`/${lang}/login`);
      }
    }
  };

  const guarantees = [
    { label: "Instant Confirmation", icon: <CheckMark size={18} /> },
    { label: "Mobile Ticket", icon: <Mobile size={18} /> },
    {
      label: "Vouchado Guarantee: always safe 20% or more",
      icon: <InstantConfirm size={18} />,
    },
  ];

  return (
    <div className="w-full min-h-screen py-6 md:py-10 selection:bg-[#2BC4CA]/20">
      <Container>
        {/* --- TWO-COLUMN MASTER CONTENT TRACK GRID --- */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
          <div className="w-full lg:min-w-[992px] rounded-2xl">
            {/* Header Content Info Block */}
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl lg:text-[64px] font-bold text-[#212B36] tracking-tight leading-tight">
                {details?.deal?.service_title}
              </h1>
              <p className="text-[#212B36] text-md sm:text-2xl font-semibold">
                {details?.deal?.short_description}
              </p>

              <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                <Link href={`/${lang}/business-profile/${details?.deal?.id}`}>
                  <div className="flex items-center gap-2">
                    <GiftVoucher color="#637381" size={24} />
                    <p className="lg:text-xl text-[#637381] hover:underline">
                      {details?.deal?.deal_name}
                    </p>
                  </div>
                </Link>
              </div>

              {/* Dynamic Badging Row */}
              <div className="flex flex-wrap items-center gap-4 pt-1.5">
                {guarantees.map((guarantee) => (
                  <div
                    key={guarantee.label}
                    className="flex items-center gap-1.5"
                  >
                    {guarantee.icon}
                    <span className="text-[#454F5B] font-normal">
                      {guarantee.label}
                    </span>
                  </div>
                ))}
              </div>

              <ProductMetrics
                rating={details?.deal?.reviews_avg_rating || 0}
                reviewsCount={details?.deal?.reviews_count || 0}
                remainingTime={details?.deal?.service_end_at || ""}
              />
            </div>

            {/* PRODUCT HERO MEDIA CONTAINER CAROUSEL BLOCK */}
            <div className="space-y-3 mt-6">
              <ItemPhotos images={details?.deal?.images} />
            </div>

            {/* --- ANCHOR SCROLL LINK NAVIGATION BAR --- */}
            <div className="sticky top-0 z-30 border-b border-gray-200 py-4">
              <div className="flex items-center gap-6 overflow-x-auto scrollbar-none">
                {tabItems.map((tab) => {
                  const sectionId = getSectionId(tab);
                  const isActive = activeSection === sectionId;
                  return (
                    <button
                      key={sectionId}
                      onClick={() => handleScrollToSection(sectionId)}
                      className={`text-md lg:text-lg font-semibold whitespace-nowrap h-full relative transition-colors border-b-2 ${
                        isActive
                          ? "text-[#2BC4CA] border-[#2BC4CA]"
                          : "border-transparent text-black"
                      }`}
                    >
                      {tab}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* --- LAYOUT CONTENT SECTIONS --- */}
            <div className="mt-8 space-y-16">
              <section id="overview" className="scroll-mt-24">
                <Overview
                  description={details?.deal?.overview_description}
                  highlights={details?.deal?.highlight_points}
                />
              </section>

              <section id="whats-included" className="scroll-mt-24">
                <Includes
                  description={details?.deal?.experience_description}
                  included={details?.deal?.include_points}
                  notIncluded={details?.deal?.not_include_points}
                />
              </section>

              <section id="reviews" className="scroll-mt-24">
                <Review
                  reviews={details?.deal?.reviews}
                  reviews_avg_rating={
                    details?.deal?.reviews_avg_rating != null
                      ? String(details.deal.reviews_avg_rating)
                      : null
                  }
                  totalReviews={details?.deal?.reviews_count}
                />
              </section>
            </div>
          </div>

          {/* RIGHT SIDEBAR COMPONENT: STICKY CHECKOUT BOOKING CARD */}
          <div className="w-full lg:min-w-[608px] space-y-4">
            <div className="flex items-center justify-end gap-2">
              <Check />
              <span className="font-medium text-[#2BC4CA]">
                Best Price Guarantee
              </span>
            </div>
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
              <div>
                <h4 className="text-xl lg:text-3xl font-bold text-gray-900">
                  {details?.deal?.deal_name}
                </h4>
                <div className="flex items-center pt-2 space-x-2">
                  <Star
                    activeColor="#FFC107"
                    inactiveColor="#DFE3E8"
                    size={details?.deal?.reviews_avg_rating || 0}
                  />
                  <span className="text-lg font-bold text-gray-900">
                    {details?.deal?.reviews_avg_rating || 0}
                  </span>
                  <span className="text-sm text-[#637381]">
                    ({details?.deal?.reviews_count} reviews)
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xl text-gray-400 line-through block font-normal">
                  {details?.deal?.original_price}
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {details.deal?.discounted_price}
                  </span>
                  <span className="bg-[#E1F7F5] text-[#31BFC8] font-semibold text-xs px-2 py-0.5 rounded-xl">
                    Save {details?.deal?.discount_percentage || 0} %
                  </span>
                </div>
              </div>

              <div className="border-t border-[#DFE3E8]" />
              <div className="space-y-3 pt-2 text-xs text-gray-600 font-light">
                <div className="flex items-start gap-2.5">
                  <div className="shrink-0 p-3 rounded-full bg-[#e5f7f8] flex items-center justify-center">
                    <CheckMark size={24} color="#31BFC8" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      Instant Confirmation
                    </p>
                    <p className="text-gray-400 mt-0.5">
                      Get your tickets instantly
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="shrink-0 p-3 rounded-full bg-[#e5f7f8] flex items-center justify-center">
                    <Mobile size={24} color="#31BFC8" />
                  </div>
                  <div>
                    <p className="text-xl font-bold text-gray-900">
                      Mobile Ticket
                    </p>
                    <p className="text-gray-400 mt-0.5">
                      Show your ticket on your phone
                    </p>
                  </div>
                </div>
              </div>

              <CounterItem
                max={details?.deal?.max_purchase_per_customer}
                defaultValue={1}
                onChange={setQuantity}
              />

              <div className="space-y-2.5 pt-1">
                <div>
                  {productIsInCart ? (
                    <Link href={`/${lang}/cart`}>
                      <div className="flex">
                        <Button className="w-full bg-[#2BC4CA] hover:bg-[#23AAB0] text-white  font-bold h-12 rounded-full text-lg transition-all active:scale-[0.99]">
                          View Cart
                        </Button>
                      </div>
                    </Link>
                  ) : (
                    <Button
                      onClick={() => handleAddToCart()}
                      className="w-full bg-[#2BC4CA] hover:bg-[#23AAB0] text-white font-bold h-12 rounded-full text-lg transition-all active:scale-[0.99]"
                    >
                      Add to Cart
                    </Button>
                  )}
                </div>
                <Button
                  disabled={createWishlistLoading}
                  onClick={() => handleAddToWishlist()}
                  variant="ghost"
                  className="w-full h-12 border border-gray-200 text-[#31BFC8] rounded-full text-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-1.5"
                >
                  {createWishlistLoading ? (
                    <Loader2 className="animate-spin size-5" />
                  ) : (
                    <Heart color={"#31BFC8"} />
                  )}
                  Add to wishlist
                </Button>
                <Button
                  disabled={isLoading}
                  variant="ghost"
                  onClick={() => handleChatWithSupport()}
                  className="w-full h-12 border border-gray-200 text-[#31BFC8] rounded-full text-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-1.5"
                >
                  {isLoading ? (
                    <Loader2 className="animate-spin size-5" />
                  ) : (
                    <>
                      <Message size={17} /> Chat with support
                    </>
                  )}
                </Button>
              </div>

              <div className="pt-3 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-light">
                <Lock />
                <span>Secure checkout</span>
              </div>
            </div>

            <div className="bg-white rounded-2xl border border-gray-100 p-4 flex items-center gap-3 text-left">
              <div className="shrink-0 w-9 h-9 rounded-full border border-gray-300 flex items-center justify-center">
                <Contact size={25} />
              </div>
              <div className="space-y-0.5">
                <p className="text-xs font-bold text-gray-800 tracking-tight">
                  Need help?
                </p>
                <p className="text-[11px] text-gray-400 font-normal leading-none">
                  Our team is here for you.
                </p>
              </div>
            </div>
            <ProductLocation
              location={{
                visit_location: details?.deal?.visit_location,
                lat: Number(details?.deal?.latitude),
                lng: Number(details?.deal?.longitude),
              }}
              opening={details?.deal?.opening_hours}
              accessibility={details?.deal?.accessibility_info}
            />
            <VouchadoCount service_end_at={details?.deal?.service_end_at} />
            <GiftVoucherCart lang={lang} deal_id={details?.deal?.id} />
          </div>
        </div>

        {details?.similar_deals && details?.similar_deals.length > 0 && (
          <SimilarItem lang={lang} similar_deals={details?.similar_deals} />
        )}
        <PromoSteps steps={promos} />
      </Container>
    </div>
  );
}
