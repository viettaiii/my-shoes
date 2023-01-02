import routesConfig from "../../config/routes";

// Menu
export const listMenu = [
    {
      text: "Nike",
      submenu: [
        { text: "Nam", path: "/nike-nam" },
        { text: "Nữ", path: "/nike-nu" },
      ],
      path: routesConfig.nike,
    },
    {
      text: "Adidas",
      submenu: [
        { text: "Nam", path: "/adidas-nam" },
        { text: "Nữ", path: "/adidas-nu" },
      ],
      path: routesConfig.adidas,
    },
    {
      text: "Jordan",
      submenu: [{ text: "Ari jordan", path: "/air-jordan" }],
      path: routesConfig.jordan,
    },
    {
      text: "Yeezy",
      submenu: [{ text: "Ari jordan", path: "/air-jordan" }],
      path: routesConfig.yeezy,
    },
    {
      text: "Other brans",
      path: routesConfig.otherBrands,
    },
    {
      text: "Sale",
      path: routesConfig.sale,
    },
    { text: "Dây giày", path: routesConfig.dayGiay },
    { text: "Spa giày", path: routesConfig.spaGiay },
    { text: "Liên hệ", path: routesConfig.lienHe },
  ];