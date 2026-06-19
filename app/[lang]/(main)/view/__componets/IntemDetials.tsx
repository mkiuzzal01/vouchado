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
import VisitorInfo from "./ProductLocation";
import Review from "../__componets/Review";
import Overview from "../__componets/Overview";
import ItemPhotos from "../__componets/ItemPhotos";
import { useAppDispatch, useAppSelector } from "@/redux/hooks/globalhooks";
import { addToCart, removeFromCart } from "@/redux/features/cart/cart.slice";
import { toast } from "react-toastify";
import { product } from "@/redux/items/ItemDetails";
import { useState } from "react";
import {
  addToWishlist,
  removeFromWishlist,
} from "@/redux/features/wishlist/wishlinst.slice";
import SimilarItem from "./SimilarItem";
import ProductInfo from "./ProductLocation";
import ProductLocation from "./ProductLocation";
import PromoSteps from "@/app/components/hero/PromoSteps";
export default function ItemDetails() {
  const [quantity, setQuantity] = useState(1);
  const tabItems = [
    "Overview",
    "What's Included",
    "Local Information",
    "Reviews",
  ];
  const { items } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  const productIsInCart = items?.some((item) => item.id === product.id);
  const productIsInWishlist = items?.some((item) => item.id === product.id);

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
        addToWishlist({
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

  return (
    <section className="w-full  min-h-screen py-6 md:py-10 selection:bg-[#2BC4CA]/20">
      <Container>
        {/* --- BREADCRUMBS ROW --- */}
        <nav className="text-xs text-gray-400 font-normal mb-4 flex items-center gap-1.5 overflow-x-auto whitespace-nowrap">
          {/*  */}
        </nav>

        {/* --- TWO-COLUMN MASTER CONTENT TRACK GRID --- */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          <div className="lg:col-span-8 space-y-8 p-6 rounded-2xl border border-gray-100">
            {/* Header Content Info Block */}
            <div className="space-y-3">
              <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-gray-900 tracking-tight leading-tight">
                {product.title}
              </h1>
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
                {product.tagline}
              </p>

              {/* Dynamic Badging Row */}
              <div className="flex flex-wrap items-center gap-4 pt-1.5 text-xs text-gray-500">
                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                <div className="flex items-center gap-1.5">
                  <svg
                    className="w-4 h-4 text-[#2BC4CA]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span>Instant Confirmation</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                <div className="flex items-center gap-1.5">
                  <Mobile />
                  <span>Mobile Ticket</span>
                </div>
                <div className="w-1 h-1 bg-gray-300 rounded-full" />
                <div className="flex items-center gap-1">
                  <Check />
                  <div>Vouchado Guarantee: always safe 20% or more.</div>
                </div>
              </div>
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
            <div className="border-b border-gray-100 flex items-center gap-6 overflow-x-auto whitespace-nowrap scrollbar-none text-sm font-semibold text-gray-400">
              <Tabs defaultValue="overview" className="w-full">
                {/* --- TAB NAVIGATION HEADER --- */}
                <TabsList className="w-full justify-start rounded-none bg-transparent p-0 border-b border-gray-100 h-auto gap-6 overflow-x-auto whitespace-nowrap scrollbar-none">
                  {tabItems.map((tab) => {
                    const value = tab.toLowerCase().replace(/\s+/g, "-");
                    return (
                      <TabsTrigger
                        key={value}
                        value={value}
                        className="rounded-none bg-transparent p-0 pb-3 border-b-2 border-transparent data-[state=active]:border-[#2BC4CA] text-sm font-semibold text-gray-400 data-[state=active]:text-[#2BC4CA]  hover:text-gray-600 transition-all shadow-none"
                      >
                        {tab}
                      </TabsTrigger>
                    );
                  })}
                </TabsList>
                <TabsContent
                  value="overview"
                  className="mt-4 focus-visible:outline-none"
                >
                  <Overview
                    description={product?.overview}
                    highlights={product?.highlights}
                    included={product?.included}
                    notIncluded={product?.notIncluded}
                  />
                </TabsContent>

                <TabsContent
                  value="what's-included"
                  className="mt-4 focus-visible:outline-none"
                >
                  <Includes
                    included={product?.included}
                    notIncluded={product?.notIncluded}
                  />
                </TabsContent>

                <TabsContent
                  value="local-information"
                  className="mt-4 focus-visible:outline-none"
                >
                  <ProductLocation />
                </TabsContent>

                <TabsContent
                  value="reviews"
                  className="mt-4 focus-visible:outline-none"
                >
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
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
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
                  <span className="bg-emerald-50 text-primary font-bold text-xs px-2 py-0.5 rounded-md">
                    Save {product.discountBadge}%
                  </span>
                </div>
              </div>

              {/* Simple Feature Checklist */}
              <div className="space-y-3 pt-2 text-xs text-gray-600 font-light">
                <div className="flex items-start gap-2.5">
                  <CheckMark />
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
                  <Mobile />
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
                  className="w-full bg-[#2BC4CA] hover:bg-[#23AAB0] text-white font-bold h-12 rounded-xl text-sm shadow-sm transition-all active:scale-[0.99]"
                >
                  {productIsInCart ? "Remove From Cart" : "Add to Cart"}
                </Button>
                <Button
                  onClick={() => handleAddToWishlist()}
                  variant="ghost"
                  className="w-full h-12 border border-gray-200 text-[#31BFC8] rounded-xl text-xs font-medium  hover:bg-gray-50 flex items-center justify-center gap-1.5"
                >
                  <Heart
                    color={productIsInWishlist ? "#31BFC8" : "currentColor"}
                  />
                  {productIsInWishlist
                    ? "Remove from wishlist"
                    : "Add to wishlist"}
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-12 border border-gray-200 text-[#31BFC8] rounded-xl text-xs font-medium  hover:bg-gray-50 flex items-center justify-center gap-1.5"
                >
                  <Message size={17} /> Chat with support
                </Button>
              </div>

              {/* Micro Secured Footers Info */}
              <div className="pt-3  border-gray-100 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-light">
                <Lock />
                <span>Secure checkout</span>
              </div>
            </div>

            {/* Support/Assistance secondary side widget component panel */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-3 text-left">
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
        <SimilarItem />
        <PromoSteps />
      </Container>
    </section>
  );
}
