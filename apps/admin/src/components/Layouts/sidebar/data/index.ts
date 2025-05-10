import * as Icons from "../icons";

export const NAV_DATA = [
  {
    label: "MAIN MENU",
    items: [
      {
        title: "Dashboard",
        url: "/",
        icon: Icons.HomeIcon,
        items: [],
      },
      // {
      //   title: "Calendar",
      //   url: "/calendar",
      //   icon: Icons.Calendar,
      //   items: [],
      // },
      // {
      //   title: "Profile",
      //   url: "/profile",
      //   icon: Icons.User,
      //   items: [],
      // },
      {
        title: "Products",
        icon: Icons.Alphabet,
        items: [
          {
            title: "Games",
            url: "/products/games",
          },
          {
            title: "Books",
            url: "/products/books",
          },
          {
            title: "Gift Cards",
            url: "/products/gift-cards",
          },
        ],
      },
      {
        title: "Orders",
        url: "/orders",
        icon: Icons.Table,
        items: [
          // {
          //   title: "Tables",
          //   url: "/tables",
          // },
        ],
      },
      {
        title: "Settings",
        icon: Icons.Alphabet,
        url: "/settings",
        items: [
          // {
          //   title: "Settings",
          //   url: "/pages/settings",
          // },
        ],
      },
    ],
  },
  // {
  //   label: "OTHERS",
  //   items: [
  //     {
  //       title: "Charts",
  //       icon: Icons.PieChart,
  //       items: [
  //         {
  //           title: "Basic Chart",
  //           url: "/charts/basic-chart",
  //         },
  //       ],
  //     },
  //     {
  //       title: "UI Elements",
  //       icon: Icons.FourCircle,
  //       items: [
  //         {
  //           title: "Alerts",
  //           url: "/ui-elements/alerts",
  //         },
  //         {
  //           title: "Buttons",
  //           url: "/ui-elements/buttons",
  //         },
  //       ],
  //     },
  //     {
  //       title: "Authentication",
  //       icon: Icons.Authentication,
  //       items: [
  //         {
  //           title: "Sign In",
  //           url: "/auth/sign-in",
  //         },
  //       ],
  //     },
  //   ],
  // },
];
