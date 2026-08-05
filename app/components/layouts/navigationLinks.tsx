import { getCategories } from "@/actions/quires/cateogries.api";
import { getDictionary } from "@/app/[lang]/dictionaries";
import { Category, ChildCategory } from "@/redux/types/categoris";

export const getServices = async (lang: string): Promise<Category[]> => {
  const categories = await getCategories();

  return categories?.data?.map((category: Category) => ({
    title: category?.name,
    href: `/${lang}/category/${category?.id}`,
    subMenu: category?.child_categories?.map((subCategory: ChildCategory) => ({
      title: subCategory?.name,
      href: `/${lang}/category/${subCategory?.id}`,
    })),
  }));
};

export const getNavLinks = async (lang: string) => {
  const dict = await getDictionary(lang);
  return [
    { title: dict.layout?.nav?.deals || "Deals", href: `/${lang}/deals` },
    { title: dict.layout?.nav?.nearby || "Nearby", href: `/${lang}/nearby` },
    {
      title: dict.layout?.nav?.how_it_works || "How it works",
      href: `/${lang}/how-it-works`,
    },
    {
      title: dict.layout?.nav?.for_business || "For Business",
      href: `/${lang}/for-business`,
    },
    {
      title: dict.layout?.nav?.contact_us || "Contact us",
      href: `/${lang}/contact`,
    },
  ];
};

export const footerLinks = async (lang: string) => {
  const dict = await getDictionary(lang);

  return {
    shopping: [
      {
        title: dict.layout?.footer?.links?.wishlist || "Wishlist",
        href: `/${lang}/wishlist`,
      },
      {
        title: dict.layout?.footer?.links?.deals || "Deals",
        href: `/${lang}/deals`,
      },
      {
        title: dict.layout?.footer?.links?.contact_us || "Contact us",
        href: `/${lang}/contact`,
      },
    ],
    customer: [
      {
        title: dict.layout?.footer?.links?.privacy_policy || "Privacy Policy",
        href: `/${lang}/privacy`,
      },
      {
        title:
          dict.layout?.footer?.links?.terms_condition || "Terms & Conditions",
        href: `/${lang}/terms`,
      },
    ],
  };
};
