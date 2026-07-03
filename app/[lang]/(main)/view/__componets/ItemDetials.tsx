"use client";
import Container from "@/app/components/shared/Container";
import { Button } from "@/components/ui/button";
import product_1 from "@/public/services/service_details.png";
import product_2 from "@/public/services/service_details.png";
import product_3 from "@/public/services/service_details.png";
import product_4 from "@/public/services/service_details.png";
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
import { product } from "@/redux/items/ItemDetails";
import { useState } from "react";
import {
  removeFromWishlist,
  toggleWishlist,
} from "@/redux/features/wishlist/wishlinst.slice";
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
import ModalContainer from "@/app/components/shared/ModalContainer";
import GiftVoucherForm from "@/app/components/forms/GiftVoucherForm";
import GiftVoucherCart from "./GiftVoucherCart";

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

interface Props {
  slug: string;
  lang: string;
}

export default function ItemDetails({ slug, lang }: Props) {
  const [openGiftVoucherModal, setOpenGiftVoucherModal] = useState(false);
  const [quantity, setQuantity] = useState(1);
  const [activeSection, setActiveSection] = useState("overview");

  const { items } = useAppSelector((state) => state.cart);
  const { items: wishlistItems } = useAppSelector((state) => state.wishlist);
  const dispatch = useAppDispatch();

  const productIsInCart = items?.some((item) => item.id === product.id);
  const productIsInWishlist = wishlistItems?.some(
    (item) => item.id === product.id,
  );

  const handleAddToCart = () => {
    if (!productIsInCart) {
      dispatch(
        addToCart({
          id: product?.id,
          title: product?.title,
          tagline: product?.tagline,
          rating: product?.rating,
          reviewsCount: product?.reviewsCount,
          location: product?.location,
          currentPrice: product?.priceOriginal,
          totalQuantity: product?.quantity,
          selectedQuantity: quantity,
        }),
      );
      toast.success("Product added to cart");
    } else {
      dispatch(removeFromCart(product?.id));
      toast.warning("Product removed from cart");
    }
  };

  const handleAddToWishlist = () => {
    if (!productIsInWishlist) {
      dispatch(
        toggleWishlist({
          id: product?.id,
          imageUrl: product?.image,
          category: "",
          title: product?.title,
          rating: product?.rating,
          location: product?.location,
          currentPrice: product?.priceOriginal,
          originalPrice: product?.priceOriginal,
          currencySymbol: "$",
          discountPercentage: product?.discountBadge,
          distance: "10km",
          endsIn: "2d 10h",
        }),
      );
      toast.success("Product added to wishlist");
    } else {
      dispatch(removeFromWishlist(product?.id));
      toast.warning("Product removed from wishlist");
    }
  };

  const tabItems = ["Overview", "What's Included", "Reviews"];

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

  const guarantees = [
    { label: "Instant Confirmation", icon: <CheckMark size={18} /> },
    { label: "Mobile Ticket", icon: <Mobile size={18} /> },
    {
      label: "Vouchado Guarantee: always safe 20% or more",
      icon: <InstantConfirm size={18} />,
    },
  ];

  return (
    <section className="w-full min-h-screen py-6 md:py-10 selection:bg-[#2BC4CA]/20">
      <Container>
        {/* --- TWO-COLUMN MASTER CONTENT TRACK GRID --- */}
        <div className="flex flex-col lg:flex-row gap-5 lg:gap-20">
          <div className="w-full lg:min-w-[992px] rounded-2xl">
            {/* Header Content Info Block */}
            <div className="space-y-3">
              <h1 className="text-2xl md:text-3xl lg:text-[64px] font-bold text-[#212B36] tracking-tight leading-tight">
                {product.title}
              </h1>
              <p className="text-[#212B36] text-md sm:text-2xl font-semibold">
                {product.tagline}
              </p>

              <div className="flex flex-col lg:flex-row lg:items-center gap-2">
                <Link href={`/${lang}/provider/provider-profile`}>
                  <div className="flex items-center gap-2">
                    <GiftVoucher color="#637381" size={24} />
                    <p className="lg:text-xl text-[#637381] hover:underline">
                      {product?.gift_voucher}
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
              <ProductMetrics />
            </div>

            {/* PRODUCT HERO MEDIA CONTAINER CAROUSEL BLOCK */}
            <div className="space-y-3 mt-6">
              <ItemPhotos
                images={[
                  product_1.src,
                  product_2.src,
                  product_3.src,
                  product_4.src,
                ]}
              />
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
                  description={product?.overview}
                  highlights={product?.highlights}
                  included={product?.included}
                  notIncluded={product?.notIncluded}
                />
              </section>

              <section id="whats-included" className="scroll-mt-24">
                <Includes
                  included={product?.included}
                  notIncluded={product?.notIncluded}
                />
              </section>

              <section id="reviews" className="scroll-mt-24">
                <Review rating={8.4} reviews={product?.customerReviews} />
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
                  Single Day Ticket
                </h4>
                <div className="flex items-center pt-2">
                  <Star
                    activeColor="#FFC107"
                    inactiveColor="#DFE3E8"
                    size={100}
                  />
                  <span className="text-lg font-bold text-gray-900">
                    {product?.rating}
                  </span>
                  <span className="text-sm text-[#637381]">
                    ({product?.reviewsCount} reviews)
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xl text-gray-400 line-through block font-normal">
                  {product.priceOriginal}
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-bold text-gray-900">
                    {product.priceOriginal}
                  </span>
                  <span className="bg-[#E1F7F5] text-[#31BFC8] font-semibold text-xs px-2 py-0.5 rounded-xl">
                    Save {product.discountBadge}%
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
                max={product.quantity}
                defaultValue={1}
                onChange={setQuantity}
              />

              <div className="space-y-2.5 pt-1">
                {productIsInCart ? (
                  <Link href={`/${lang}/cart`}>
                    <Button className="w-full bg-[#2BC4CA] hover:bg-[#23AAB0] text-white font-bold h-12 rounded-full text-lg transition-all active:scale-[0.99]">
                      View Cart
                    </Button>
                  </Link>
                ) : (
                  <Button
                    onClick={() => handleAddToCart()}
                    className="w-full bg-[#2BC4CA] hover:bg-[#23AAB0] text-white font-bold h-12 rounded-full text-lg transition-all active:scale-[0.99]"
                  >
                    Add to Cart
                  </Button>
                )}
                <Button
                  onClick={() => handleAddToWishlist()}
                  variant="ghost"
                  className="w-full h-12 border border-gray-200 text-[#31BFC8] rounded-full text-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-1.5"
                >
                  <Heart color={productIsInWishlist ? "red" : "#31BFC8"} />
                  {productIsInWishlist
                    ? "Remove from wishlist"
                    : "Add to wishlist"}
                </Button>
                <Link href={`/en/chat`}>
                  <Button
                    variant="ghost"
                    className="w-full h-12 border border-gray-200 text-[#31BFC8] rounded-full text-lg font-medium hover:bg-gray-50 flex items-center justify-center gap-1.5"
                  >
                    <Message size={17} /> Chat with support
                  </Button>
                </Link>
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
            <ProductLocation />
            <VouchadoCount />
            <GiftVoucherCart />
          </div>
        </div>
        <SimilarItem lang={lang} />
        <PromoSteps steps={promos} />
      </Container>

      <ModalContainer
        title="Buy Gift Voucher"
        className="w-[593px]"
        isOpen={openGiftVoucherModal}
        onClose={() => setOpenGiftVoucherModal(false)}
      >
        <GiftVoucherForm />
      </ModalContainer>
    </section>
  );
}
