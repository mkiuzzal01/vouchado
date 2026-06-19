import { IProduct } from "./TItemDetails";

export const product: IProduct = {
  id: "1",
  title: "US Olympic & Paralympic Museum Ticket",
  tagline: "Experience America's Olympic history through interactive exhibits.",
  image:
    "https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=500&auto=format&fit=crop&q=60",
  rating: 4.8,
  reviewsCount: 12500,
  priceOriginal: 124.5,
  discountBadge: 17,
  quantity: 5,
  overview:
    "Experience American athletic excellence, where 12 galleries bring the triumphs & stories of Team USA to life. From viewing artifacts like the Olympic torch to collecting personalized memories in your digital locker, it is an inspiring journey through sports history",
  location: "1 Olympic Plaza, Colorado Springs, CO 80909",
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
