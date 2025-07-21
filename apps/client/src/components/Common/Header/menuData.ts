import { CONTACT, HOME, SHOP } from "@/constants";
import { Menu } from "@/types/Menu";

export const menuData: Menu[] = [
  {
    id: 1,
    title: "Home",
    newTab: false,
    path: HOME,
  },
  {
    id: 2,
    title: "Shop",
    newTab: false,
    path: SHOP,
  },
  {
    id: 3,
    title: "Contact",
    newTab: false,
    path: CONTACT,
  },
];
