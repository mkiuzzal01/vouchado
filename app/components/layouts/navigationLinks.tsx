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

export const getServices = async (lang: string) => {
  const dict = await getDictionary(lang);
  return [
    {
      title: dict.nav.service1,
      href: `/${lang}/services/service-1`,
      subMenu: [
        {
          title: dict.nav.subService1,
          href: `/${lang}/services/service-1`,
        },
        {
          title: dict.nav.subService2,
          href: `/${lang}/service-1/sub-service-2`,
        },
      ],
    },
    {
      title: dict.nav.service2,
      href: `/${lang}/services/service-2`,
      subMenu: [
        {
          title: dict.nav.subService1,
          href: `/${lang}/service-2/sub-service-1`,
        },
        {
          title: dict.nav.subService2,
          href: `/${lang}/service-2/sub-service-2`,
        },
      ],
    },
    {
      title: dict.nav.service3,
      href: `/${lang}/service-3`,
      subMenu: [
        {
          title: dict.nav.subService1,
          href: `/${lang}/service-3/sub-service-1`,
        },
        {
          title: dict.nav.subService2,
          href: `/${lang}/service-3/sub-service-2`,
        },
      ],
    },
  ];
};

export const getNavLinks = async (lang: string) => {
  const dict = await getDictionary(lang);
  return [
    {
      title: dict.nav.offers,
      href: `/${lang}/offers`,
    },
    {
      title: dict.nav.nearby,
      href: `/${lang}/nearby`,
    },
    {
      title: dict.nav.how_it_works,
      href: `/${lang}/how-it-works`,
    },
    {
      title: dict.nav.for_business,
      href: `/${lang}/for-business`,
    },
    {
      title: dict.nav.contact_us,
      href: `/${lang}/contact`,
    },
  ];
};

export const footerLinks = async (lang: string) => {
  const dict = await getDictionary(lang);

  return {
    shopping: [
      { title: dict.footer.links.wishlist, href: `/${lang}/wishlist` },
      { title: dict.footer.links.category, href: `/${lang}/category` },
      { title: dict.footer.links.offers, href: `/${lang}/offers` },
      { title: dict.footer.links.faq, href: `/${lang}/faq` },
      { title: dict.footer.links.contact_us, href: `/${lang}/contact` },
    ],

    customer: [
      {
        title: dict.footer.links.privacy_policy,
        href: `/${lang}/privacy`,
      },
      {
        title: dict.footer.links.terms_condition,
        href: `/${lang}/terms`,
      },
    ],
  };
};
