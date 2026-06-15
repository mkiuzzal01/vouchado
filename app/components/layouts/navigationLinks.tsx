export interface INavbar {
  title: string;
  href: string;
  subMenu?: SubMenu[];
}

export interface SubMenu {
  title: string;
  href: string;
}

export const services: INavbar[] = [
  {
    title: "Service 1",
    href: "/services/service-1",
    subMenu: [
      {
        title: "Sub Service 1",
        href: "/services/service-1",
      },
      {
        title: "Sub Service 2",
        href: "/services/service-1/sub-service-2",
      },
    ],
  },
  {
    title: "Service 2",
    href: "/services/service-2",
    subMenu: [
      {
        title: "Sub Service 1",
        href: "/services/service-2/sub-service-1",
      },
      {
        title: "Sub Service 2",
        href: "/services/service-2/sub-service-2",
      },
    ],
  },
];

export const navigationLinks: INavbar[] = [
  {
    title: "Home",
    href: "/",
  },
  {
    title: "Offers",
    href: "/offers",
  },
  {
    title: "Nearby",
    href: "/nearby",
  },
  {
    title: "How it works",
    href: "/how-it-works",
  },
  {
    title: "For Business",
    href: "/for-business",
  },
  {
    title: "Contact Us",
    href: "/contact",
  },
];
