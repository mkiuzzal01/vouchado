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
      href: `/${lang}/services/adventure-sports`,
      subMenu: [
        {
          title: "Pilates",
          href: `/${lang}/services/pilates`,
        },
        {
          title: "Yoga",
          href: `/${lang}/services/yoga`,
        },
        {
          title: "Courses",
          href: `/${lang}/services/courses`,
        },
        {
          title: "Rental",
          href: `/${lang}/services/rental`,
        },
      ],
    },
    {
      title: "Eat and Drink",
      href: `/${lang}/services/eat-and-drink`,
      subMenu: [
        {
          title: "Drinks",
          href: `/${lang}/services/drinks`,
        },
        {
          title: "Brunch",
          href: `/${lang}/services/brunch`,
        },
        {
          title: "Lunch",
          href: `/${lang}/services/lunch`,
        },
        {
          title: "Dinner",
          href: `/${lang}/services/dinner`,
        },
        {
          title: "Sweets",
          href: `/${lang}/services/sweets`,
        },
      ],
    },
    {
      title: "Family & Kids",
      href: `/${lang}/services/family-kids`,
      subMenu: [
        {
          title: "Leisure Time",
          href: `/${lang}/services/leisure-time`,
        },
      ],
    },
    {
      title: "Beauty & Wellness",
      href: `/${lang}/services/beauty-wellness`,
      subMenu: [
        {
          title: "Hairdresser",
          href: `/${lang}/services/hairdresser`,
        },
        {
          title: "Beautytreatment",
          href: `/${lang}/services/beautytreatment`,
        },
        {
          title: "Massages",
          href: `/${lang}/services/massages`,
        },
        {
          title: "Microblading & Permanent",
          href: `/${lang}/services/microblading-permanent`,
        },
      ],
    },
    {
      title: "Creative",
      href: `/${lang}/services/creative`,
      subMenu: [
        {
          title: "Art Supplies",
          href: `/${lang}/services/art-supplies`,
        },
        {
          title: "DIY & Crafts",
          href: `/${lang}/services/diy-crafts`,
        },
        {
          title: "Photography",
          href: `/${lang}/services/photography`,
        },
        {
          title: "Musical Instruments",
          href: `/${lang}/services/musical-instruments`,
        },
      ],
    },
    {
      title: "Hotel nd Culture",
      href: `/${lang}/services/hotel-culture`,
      subMenu: [
        {
          title: "Boutique Hotels",
          href: `/${lang}/services/boutique-hotels`,
        },
        {
          title: "Cultural Experiences",
          href: `/${lang}/services/cultural-experiences`,
        },
        {
          title: "Luxury Stays",
          href: `/${lang}/services/luxury-stays`,
        },
        {
          title: "Local Tours",
          href: `/${lang}/services/local-tours`,
        },
      ],
    },
  ];
};

export const getNavLinks = async (lang: string) => {
  const dict = await getDictionary(lang);
  return [
    { title: dict.nav?.offers || "Offers", href: `/${lang}/offers` },
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
        title: dict.footer?.links?.offers || "Offers",
        href: `/${lang}/offers`,
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
