import { getDictionary } from "@/app/[lang]/dictionaries";

export interface INavbar {
  title: string;
  href: string;
  subMenu?: SubMenu[];
}

export interface SubMenu {
  title: string;
  href: string;
}

export const getServices = async (lang: string): Promise<INavbar[]> => {
  const dict = await getDictionary(lang);

  // Maps directly to the 6 core multi-column categories
  return [
    {
      title: "Adventure & Sports",
      href: `/${lang}/category/adventure-sports`,
      subMenu: [
        {
          title: "Pilates",
          href: `/${lang}/category/pilates`,
        },
        {
          title: "Yoga",
          href: `/${lang}/category/yoga`,
        },
        {
          title: "Courses",
          href: `/${lang}/category/courses`,
        },
        {
          title: "Rental",
          href: `/${lang}/category/rental`,
        },
      ],
    },
    {
      title: "Eat and Drink",
      href: `/${lang}/category/eat-and-drink`,
      subMenu: [
        {
          title: "Drinks",
          href: `/${lang}/category/drinks`,
        },
        {
          title: "Brunch",
          href: `/${lang}/category/brunch`,
        },
        {
          title: "Lunch",
          href: `/${lang}/category/lunch`,
        },
        {
          title: "Dinner",
          href: `/${lang}/category/dinner`,
        },
        {
          title: "Sweets",
          href: `/${lang}/category/sweets`,
        },
      ],
    },
    {
      title: "Family & Kids",
      href: `/${lang}/category/family-kids`,
      subMenu: [
        {
          title: "Leisure Time",
          href: `/${lang}/category/leisure-time`,
        },
      ],
    },
    {
      title: "Beauty & Wellness",
      href: `/${lang}/category/beauty-wellness`,
      subMenu: [
        {
          title: "Hairdresser",
          href: `/${lang}/category/hairdresser`,
        },
        {
          title: "Beautytreatment",
          href: `/${lang}/category/beautytreatment`,
        },
        {
          title: "Massages",
          href: `/${lang}/category/massages`,
        },
        {
          title: "Microblading & Permanent",
          href: `/${lang}/category/microblading-permanent`,
        },
      ],
    },
    {
      title: "Creative",
      href: `/${lang}/category/creative`,
      subMenu: [
        {
          title: "Art Supplies",
          href: `/${lang}/category/art-supplies`,
        },
        {
          title: "DIY & Crafts",
          href: `/${lang}/category/diy-crafts`,
        },
        {
          title: "Photography",
          href: `/${lang}/category/photography`,
        },
        {
          title: "Musical Instruments",
          href: `/${lang}/category/musical-instruments`,
        },
      ],
    },
    {
      title: "Hotel nd Culture",
      href: `/${lang}/category/hotel-culture`,
      subMenu: [
        {
          title: "Boutique Hotels",
          href: `/${lang}/category/boutique-hotels`,
        },
        {
          title: "Cultural Experiences",
          href: `/${lang}/category/cultural-experiences`,
        },
        {
          title: "Luxury Stays",
          href: `/${lang}/category/luxury-stays`,
        },
        {
          title: "Local Tours",
          href: `/${lang}/category/local-tours`,
        },
      ],
    },
  ];
};

export const getNavLinks = async (lang: string) => {
  const dict = await getDictionary(lang);
  return [
    { title: dict.nav?.deals || "Deals", href: `/${lang}/deals` },
    { title: dict.nav?.nearby || "Nearby", href: `/${lang}/nearby` },
    {
      title: dict.nav?.how_it_works || "How it works",
      href: `/${lang}/how-it-works`,
    },
    {
      title: dict.nav?.for_business || "For Business",
      href: `/${lang}/for-business`,
    },
    { title: dict.nav?.contact_us || "Contact us", href: `/${lang}/contact` },
  ];
};

export const footerLinks = async (lang: string) => {
  const dict = await getDictionary(lang);

  return {
    shopping: [
      {
        title: dict.footer?.links?.wishlist || "Wishlist",
        href: `/${lang}/wishlist`,
      },
      {
        title: dict.footer?.links?.deals || "Deals",
        href: `/${lang}/deals`,
      },
      {
        title: dict.footer?.links?.contact_us || "Contact us",
        href: `/${lang}/contact`,
      },
    ],
    customer: [
      {
        title: dict.footer?.links?.privacy_policy || "Privacy Policy",
        href: `/${lang}/privacy`,
      },
      {
        title: dict.footer?.links?.terms_condition || "Terms & Conditions",
        href: `/${lang}/terms`,
      },
    ],
  };
};
