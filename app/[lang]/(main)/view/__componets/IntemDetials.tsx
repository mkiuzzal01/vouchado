"use client";
import Container from "@/app/components/shared/Container";
import { Button } from "@/components/ui/button";
import product_1 from "@/public/services/service_details.png";
import product_2 from "@/public/services/service_details.png";
import product_3 from "@/public/services/service_details.png";
import product_4 from "@/public/services/service_details.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Contact from "@/app/components/icons/Contact";
import Lock from "@/app/components/icons/Lock";
import Message from "@/app/components/icons/Message";
import Heart from "@/app/components/icons/Heart";
import CounterItem from "@/app/components/shared/CounterItem";
import Check from "@/app/components/icons/Check";
import Mobile from "@/app/components/icons/Mobile";
import CheckMark from "@/app/components/icons/CheckMark";
import Star from "@/app/components/icons/Star";
import Includes from "../__componets/Includes";
import Review from "../__componets/Review";
import Overview from "../__componets/Overview";
import ItemPhotos from "../__componets/ItemPhotos";
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

export const promos = [
  {
    title: "Best Price Guarantee",
    description: "Vouchado Deals are always 20% cheaper and MORE!",
    icon: <Save />,
  },
  {
    title: "Easy & Secure Booking",
    description: "Your data is safe with us.",
    icon: <SecurePayment />,
  },
  {
    title: "Instant Confirmation",
    description: "Book & get confirmed instantly.",
    icon: <InstantConfirm />,
  },
  {
    title: "In Person Support",
    description: "We're here to help anytime.",
    icon: <Contact />,
  },
];

interface Props {
  slug: string;
  lang: string;
}

export default function ItemDetails({ slug, lang }: Props) {
  const [quantity, setQuantity] = useState(1);
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

  const tabItems = [
    "Overview",
    "What's Included",
    "Local Information",
    "Reviews",
  ];

  const guarantees = [
    { label: "Instant Confirmation", icon: <CheckMark size={18} /> },
    { label: "Mobile Ticket", icon: <Mobile size={18} /> },
    {
      label: "Vouchado Guarantee: always safe 20% or more",
      icon: <InstantConfirm size={18} />,
    },
  ];

  return (
    <section className="w-full  min-h-screen py-6 md:py-10 selection:bg-[#2BC4CA]/20">
      <Container>
        {/* --- TWO-COLUMN MASTER CONTENT TRACK GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8 p-6 rounded-2xl border border-gray-100">
            {/* Header Content Info Block */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-gray-900 tracking-tight leading-tight">
                {product.title}
              </h1>
              <p className="text-gray-700 text-sm sm:text-base max-w-2xl font-bold leading-relaxed">
                {product.tagline}
              </p>

              {/* Dynamic Badging Row */}
              <div className="flex flex-wrap items-center gap-4 pt-1.5 text-sm text-gray-500">
                {guarantees.map((guarantee) => (
                  <div
                    key={guarantee.label}
                    className="flex items-center gap-1.5 bg-gray-100 p-2 rounded-lg"
                  >
                    {guarantee.icon}
                    <span>{guarantee.label}</span>
                  </div>
                ))}
              </div>
              <ProductMetrics />
            </div>

            {/* PRODUCT HERO MEDIA CONTAINER CAROUSEL BLOCK */}
            <div className="space-y-3">
              <ItemPhotos
                images={[
                  product_1.src,
                  product_2.src,
                  product_3.src,
                  product_4.src,
                ]}
              />
            </div>

            {/* TAB SYSTEM SECTION INTERFACES */}
            <div className="flex items-center gap-6 overflow-x-auto scrollbar-none text-sm font-semibold text-gray-400">
              <Tabs defaultValue="overview" className="w-full">
                {/* --- TAB NAVIGATION HEADER --- */}
                <TabsList
                  variant={"line"}
                  className="w-full h-auto gap-6 overflow-x-auto scrollbar-none"
                >
                  {tabItems.map((tab) => {
                    const value = tab.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <TabsTrigger
                        className="font-bold"
                        key={value}
                        value={value}
                      >
                        {tab}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
                <TabsContent value="overview" className="mt-4">
                  <Overview
                    description={product?.overview}
                    highlights={product?.highlights}
                    included={product?.included}
                    notIncluded={product?.notIncluded}
                  />
                </TabsContent>

                <TabsContent value="what's-included" className="mt-4">
                  <Includes
                    included={product?.included}
                    notIncluded={product?.notIncluded}
                  />
                </TabsContent>

                <TabsContent value="local-information" className="mt-4">
                  <ProductLocation />
                </TabsContent>

                <TabsContent value="reviews" className="mt-4">
                  <Review rating={200} reviews={product?.customerReviews} />
                </TabsContent>
              </Tabs>
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT SIDEBAR COMPONENT: STICKY CHECKOUT BOOKING CARD (4 / 12 Columns) */}
          {/* ================================================================= */}
          <div className="lg:col-span-4 lg:sticky lg:top-6 space-y-4">
            <div className="flex items-center justify-end gap-2">
              <Check />
              Best Price Guarantee
            </div>
            {/* Primary Action Panel wrapper card element layout */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 space-y-5">
              <div>
                <h4 className="text-2xl font-bold text-gray-900">
                  Single Day Ticket
                </h4>
                <div className="flex items-center gap-1 py-4">
                  <Star
                    activeColor="#FFC107"
                    inactiveColor="#DFE3E8"
                    size={100}
                  />
                  <span className="text-sm font-bold text-gray-900">
                    {product?.rating}
                  </span>
                  <span className="text-sm text-gray-500">
                    ({product?.reviewsCount} reviews)
                  </span>
                </div>
              </div>
              <div>
                <span className="text-xs text-gray-400 line-through block font-light">
                  {product.priceOriginal}
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {product.priceOriginal}
                  </span>
                  <span className="bg-[#E1F7F5] text-[#31BFC8] font-bold text-xs px-2 py-0.5 rounded-md">
                    Save {product.discountBadge}%
                  </span>
                </div>
              </div>

              {/* Simple Feature Checklist */}
              <div className="space-y-3 pt-2 text-xs text-gray-600 font-light">
                <div className="flex items-start gap-2.5">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-[#e5f7f8]  border-gray-300 flex items-center justify-center">
                    <CheckMark color="#31BFC8" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">
                      Instant Confirmation
                    </p>
                    <p className="text-gray-400 text-[11px] mt-0.5">
                      Get your tickets instantly
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-2.5">
                  <div className="shrink-0 w-9 h-9 rounded-full bg-[#e5f7f8]  border-gray-300 flex items-center justify-center">
                    <Mobile color="#31BFC8" />
                  </div>
                  <div>
                    <p className="font-bold text-gray-900">Mobile Ticket</p>
                    <p className="text-gray-400 text-[11px] mt-0.5">
                      Show your ticket on your phone
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Input Quantity Ticket Selector Panel Wrapper */}
              <CounterItem
                max={product.quantity}
                defaultValue={1}
                onChange={setQuantity}
              />

              {/* Action Routes Button Modules */}
              <div className="space-y-2.5 pt-1">
                <Button
                  onClick={() => handleAddToCart()}
                  className="w-full bg-[#2BC4CA] hover:bg-[#23AAB0] text-white font-bold h-12 rounded-full text-sm  transition-all active:scale-[0.99]"
                >
                  {productIsInCart ? "Remove From Cart" : "Add to Cart"}
                </Button>
                <Button
                  onClick={() => handleAddToWishlist()}
                  variant="ghost"
                  className="w-full h-12 border border-gray-200 text-[#31BFC8] rounded-full text-xs font-medium  hover:bg-gray-50 flex items-center justify-center gap-1.5"
                >
                  <Heart color={productIsInWishlist ? "red" : "#31BFC8"} />
                  {productIsInWishlist
                    ? "Remove from wishlist"
                    : "Add to wishlist"}
                </Button>
                <Link href={`/en/chat`}>
                  <Button
                    variant="ghost"
                    className="w-full h-12 border border-gray-200 text-[#31BFC8] rounded-full text-xs font-medium  hover:bg-gray-50 flex items-center justify-center gap-1.5"
                  >
                    <Message size={17} /> Chat with support
                  </Button>
                </Link>
              </div>

              {/* Micro Secured Footers Info */}
              <div className="pt-3  border-gray-100 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-light">
                <Lock />
                <span>Secure checkout</span>
              </div>
            </div>

            {/* Support/Assistance secondary side widget component panel */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4  flex items-center gap-3 text-left">
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
          </div>
        </div>
        <SimilarItem lang={lang} />
        <PromoSteps steps={promos} />
      </Container>
    </section>
  );
}
