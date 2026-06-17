import Container from "@/app/components/shared/Container";
import { Button } from "@/components/ui/button";
import ItemPhotos from "../__components/ItemPhotos";
import product_1 from "@/public/services/service_details.png";
import product_2 from "@/public/services/service_details.png";
import product_3 from "@/public/services/service_details.png";
import product_4 from "@/public/services/service_details.png";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Overview from "../__components/Overview";
import Includes from "../__components/Includes";
import VisitorInfo from "../__components/VisitorInfo";
import Review from "../__components/Review";
import ItemMap from "../__components/ItemMap";

interface Props {
  params: Promise<{ slug: string }>;
}

export default async function ServiceDetailsPage({ params }: Props) {
  const { slug } = await params;
  const tabItems = ["Overview", "What's Included", "Visitor Info", "Reviews"];

  const product = {
    title: "US Olympic & Paralympic Museum Ticket",
    tagline:
      "Experience America's Olympic history through interactive exhibits.",
    rating: 4.8,
    reviewsCount: "12,500+",
    priceOriginal: "€ 124.50",
    discountBadge: "Save 17%",

    overview:
      "Experience American athletic excellence, where 12 galleries bring the triumphs & stories of Team USA to life. From viewing artifacts like the Olympic torch to collecting personalized memories in your digital locker, it is an inspiring journey through sports history",

    highlights: [
      { id: 1, text: "Explore the inspiring history of Team USA" },
      { id: 2, text: "Interactive exhibits & hands-on activities" },
      { id: 3, text: "Iconic memorabilia & athlete stories" },
      { id: 4, text: "Fun for all ages & fully accessible" },
    ],
    included: [
      "Museum admission",
      "All permanent exhibits",
      "Interactive experiences",
      "Digital guide",
    ],
    notIncluded: [
      "Parking",
      "Food & beverages",
      "Special exhibitions (if any)",
      "Transportation",
    ],
    customerReviews: [
      {
        id: 1,
        name: "Ava J.",
        rating: 5,
        date: "5 days ago",
        comment:
          "These sneakers are not just trendy; they are also super comfortable for all-day wear. I love how they look with both casual and sporty outfits!",
      },
      {
        id: 2,
        name: "James K.",
        rating: 5,
        date: "3 weeks ago",
        comment:
          "These joggers are incredibly comfortable. The fabric is soft against the skin, and they transition well from lounging at home to running errands.",
      },
      {
        id: 3,
        name: "Liam B.",
        rating: 5,
        date: "1 month ago",
        comment:
          "The fabric of this scarf is luxurious and warm. It adds a nice touch to any outfit, and I find myself reaching for it almost every day!",
      },
    ],
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
          {/* ================================================================= */}
          {/* LEFT CONTAINER COMPONENT: DETAILED SYSTEM OVERVIEW (8 / 12 Columns) */}
          {/* ================================================================= */}
          <div className="lg:col-span-8 space-y-8 p-6 rounded-2xl border border-gray-100">
            {/* Header Content Info Block */}
            <div className="space-y-3">
              <div className="flex items-center gap-2">
                <span className="bg-[#2BC4CA]/10 text-[#0E6A70] text-[11px] font-bold px-2.5 py-1 rounded-md uppercase tracking-wide">
                  ⭐ Best Price Guarantee
                </span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-[38px] font-extrabold text-gray-900 tracking-tight leading-tight">
                {product.title}
              </h1>
              <p className="text-gray-500 text-sm sm:text-base max-w-2xl font-light leading-relaxed">
                {product.tagline}
              </p>

              {/* Dynamic Badging Row */}
              <div className="flex flex-wrap items-center gap-4 pt-1.5 text-xs text-gray-500">
                <div className="flex items-center gap-1 text-gray-900 font-bold">
                  <span>★</span> <span>{product.rating}</span>
                  <span className="text-gray-400 font-normal">
                    ({product.reviewsCount} reviews)
                  </span>
                </div>
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
                  <svg
                    className="w-4 h-4 text-[#2BC4CA]"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                  >
                    <path d="M12 18h.01M8 21h8a2 2 0 002-2V5a2 2 0 00-2-2H8a2 2 0 00-2 2v14a2 2 0 002 2z" />
                  </svg>
                  <span>Mobile Ticket</span>
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
                        className="rounded-none bg-transparent p-0 pb-3 border-b-2 border-transparent data-[state=active]:border-[#2BC4CA] text-sm font-semibold text-gray-400 data-[state=active]:text-gray-900 data-[state=active]:font-bold hover:text-gray-600 transition-all shadow-none"
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
                  <Includes />
                </TabsContent>

                <TabsContent
                  value="visitor-info"
                  className="mt-4 focus-visible:outline-none"
                >
                  <VisitorInfo />
                </TabsContent>

                <TabsContent
                  value="reviews"
                  className="mt-4 focus-visible:outline-none"
                >
                  <Review />
                </TabsContent>
              </Tabs>
            </div>

            {/* CUSTOMER REVIEWS TERMINAL INTERFACE SECTION MODULE */}
            <div className="space-y-6 pt-8 border-t border-gray-100">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-bold text-gray-900">
                    Customer Reviews
                  </h3>
                  <div className="flex items-center gap-2 text-xs text-gray-500 mt-1">
                    <span className="text-gray-900 font-extrabold text-sm">
                      {product.rating}
                    </span>
                    <span>★★★★★</span>
                    <span>Based on 20+ trusted reviews</span>
                  </div>
                </div>
                <Button
                  variant="outline"
                  className="rounded-full text-xs font-bold border-gray-200 text-[#0E6A70]"
                >
                  View all reviews
                </Button>
              </div>

              {/* Grid System Feedback Loop Cards */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                {product.customerReviews.map((rev) => (
                  <div
                    key={rev.id}
                    className="border border-gray-100 bg-[#FAFAFA]/50 rounded-2xl p-4 space-y-2 text-left flex flex-col justify-between"
                  >
                    <div className="space-y-1.5">
                      <div className="flex items-center justify-between text-xs text-gray-400">
                        <span className="text-amber-500 font-medium">
                          ★★★★★
                        </span>
                        <span>{rev.date}</span>
                      </div>
                      <h5 className="text-xs sm:text-sm font-bold text-gray-900">
                        {rev.name}
                      </h5>
                      <p className="text-xs text-gray-500 font-light leading-relaxed line-clamp-4">
                        "{rev.comment}"
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* ================================================================= */}
          {/* RIGHT SIDEBAR COMPONENT: STICKY CHECKOUT BOOKING CARD (4 / 12 Columns) */}
          {/* ================================================================= */}
          <div className="lg:col-span-4 lg:sticky lg:top-6 space-y-4">
            {/* Primary Action Panel wrapper card element layout */}
            <div className="bg-white rounded-2xl border border-gray-100 p-6 shadow-sm space-y-5">
              <div>
                <span className="text-xs text-gray-400 line-through block font-light">
                  {product.priceOriginal}
                </span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span className="text-2xl sm:text-3xl font-extrabold text-gray-900">
                    {product.priceOriginal}
                  </span>
                  <span className="bg-emerald-50 text-emerald-600 font-bold text-xs px-2 py-0.5 rounded-md">
                    {product.discountBadge}
                  </span>
                </div>
              </div>

              {/* Simple Feature Checklist */}
              <div className="space-y-3 pt-2 text-xs text-gray-600 font-light">
                <div className="flex items-start gap-2.5">
                  <span className="text-[#2BC4CA] text-sm leading-none">✓</span>
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
                  <span className="text-[#2BC4CA] text-sm leading-none">✓</span>
                  <div>
                    <p className="font-bold text-gray-900">Mobile Ticket</p>
                    <p className="text-gray-400 text-[11px] mt-0.5">
                      Show your ticket on your phone
                    </p>
                  </div>
                </div>
              </div>

              {/* Core Input Quantity Ticket Selector Panel Wrapper */}
              <div className="bg-gray-50 rounded-xl p-3 flex items-center justify-between border border-gray-100/70">
                <span className="text-xs font-bold text-gray-800">
                  Tickets Quantity
                </span>
                <div className="flex items-center gap-3">
                  <button className="w-7 h-7 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm hover:bg-gray-100 transition-colors">
                    -
                  </button>
                  <span className="text-sm font-bold text-gray-900">1</span>
                  <button className="w-7 h-7 rounded-full bg-white border border-gray-200 text-gray-600 flex items-center justify-center font-bold text-sm hover:bg-gray-100 transition-colors">
                    +
                  </button>
                </div>
              </div>

              {/* Action Routes Button Modules */}
              <div className="space-y-2.5 pt-1">
                <Button className="w-full bg-[#2BC4CA] hover:bg-[#23AAB0] text-white font-bold h-12 rounded-xl text-sm shadow-sm transition-all active:scale-[0.99]">
                  Book Now
                </Button>
                <Button
                  variant="outline"
                  className="w-full h-11 border-gray-200 text-gray-700 rounded-xl text-xs font-bold bg-white hover:bg-gray-50"
                >
                  ♡ Add to wishlist
                </Button>
                <Button
                  variant="ghost"
                  className="w-full h-10 text-gray-400 rounded-xl text-xs font-medium hover:text-gray-600 hover:bg-gray-50 flex items-center justify-center gap-1.5"
                >
                  <span>💬 Chat with support</span>
                </Button>
              </div>

              {/* Micro Secured Footers Info */}
              <div className="pt-3 border-t border-gray-100 flex items-center justify-center gap-1.5 text-[11px] text-gray-400 font-light">
                <span>🔒 Secure checkout</span>
              </div>
            </div>

            {/* Support/Assistance secondary side widget component panel */}
            <div className="bg-white rounded-2xl border border-gray-100 p-4 shadow-sm flex items-center gap-3 text-left">
              <div className="w-9 h-9 rounded-full bg-[#2BC4CA]/10 flex items-center justify-center text-[#0E6A70] shrink-0 text-sm">
                🎧
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

            {/* Visitor Information Side Panel Map Preview Frame Wrapper */}
            <div className="bg-white rounded-2xl border border-gray-100 p-5 shadow-sm space-y-4 text-left">
              <h4 className="text-sm font-bold text-gray-900 tracking-tight">
                Visitor Information
              </h4>

              <div className="space-y-3.5 text-xs text-gray-600 font-light">
                {/* Location Meta Layout Block */}
                <div className="flex items-start gap-2.5">
                  <span className="text-[#0E6A70] text-sm mt-0.5">📍</span>
                  <div className="space-y-0.5">
                    <p className="font-bold text-gray-900">Location</p>
                    <p className="text-gray-400 leading-normal text-[11px]">
                      200 S Sierra Madre St, Colorado Springs, CO 80903, United
                      States
                    </p>
                  </div>
                </div>

                {/* Opening Hours Meta Layout Block */}
                <div className="flex items-start gap-2.5">
                  <span className="text-[#0E6A70] text-sm mt-0.5">🕒</span>
                  <div className="space-y-0.5">
                    <p className="font-bold text-gray-900">Opening Hours</p>
                    <p className="text-gray-400 leading-normal text-[11px]">
                      Mon - Sun: 9:00 AM - 5:00 PM, Last entry: 4:00 PM
                    </p>
                  </div>
                </div>

                {/* Accessibility Meta Layout Block */}
                <div className="flex items-start gap-2.5">
                  <span className="text-[#0E6A70] text-sm mt-0.5">♿</span>
                  <div className="space-y-0.5">
                    <p className="font-bold text-gray-900">Accessibility</p>
                    <p className="text-gray-400 leading-normal text-[11px]">
                      Fully accessible for wheelchairs and strollers.
                    </p>
                  </div>
                </div>
              </div>

              {/* Miniature Map Segment Frame Layout */}
              <div className="relative aspect-[4/3] w-full bg-slate-50 border border-gray-100 rounded-xl overflow-hidden mt-2 p-4 flex flex-col justify-between">
                <ItemMap />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </section>
  );
}
