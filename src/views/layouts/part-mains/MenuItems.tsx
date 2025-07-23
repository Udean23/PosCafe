import {
  CalendarCheck,
  ChefHat,
  CookingPot,
  DiamondPercent,
  HandPlatter,
  SquareUser,
} from "lucide-react";
import {
  FaBoxesPacking,
  FaUserTag,
} from "react-icons/fa6";
import {
  FiHome,
  FiLayers,
} from "react-icons/fi";
import { TbShoppingCart } from "react-icons/tb";

export const menuItems = [
  {
    label: "Dashboard",
    children: [
      {
        label: "Beranda",
        icon: <FiHome />,
        path: "/dashboard",
      }
    ]
  },
  {
    group: "Transaksi",
    label: "Penjualan",
    icon: <TbShoppingCart />,
    path: "/outlets",
    isDropdown: true,
    children: [
      {
        label: "Kasir",
        icon: <TbShoppingCart />,
        path: "/kasir",
      },
      {
        label: "Riwayat Pesanan",
        icon: <HandPlatter size={16} />,
        path: "/order-list",
      },
    ],
  },
  {
    label: "Produk",
    children: [
      {
        label: "Kategori",
        icon: <FiLayers />,
        path: "/categories",
      },
      {
        label: "Menu",
        icon: <ChefHat size={16} />,
        path: "/products",
      },
      {
        label: "Resep",
        icon: <CookingPot size={16} />,
        path: "/bundlings",
      },
      {
        label: "Diskon",
        icon: <DiamondPercent size={16} />,
        path: "/blendings",
      },
      {
        label: "Bahan Baku",
        icon: <FaBoxesPacking />,
        path: "/requeststock",
      },
    ],
  },
  {
    label: "Lainnya",
    children: [
      {
        label: "Shift",
        icon: <CalendarCheck size={16} />,
        path: "/shift",
      },
      {
        label: "Sections",
        icon: <FaUserTag />,
        path: "/roles",
      },
      {
        label: "Karyawan",
        icon: <SquareUser size={16} />,
        path: "/users",
      },
    ],
  },
];
