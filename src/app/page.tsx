"use client";
import Header from "@/components/global/headercomponents/Header";
import SideBar from "@/components/global/headercomponents/SideBar";
import HomePage from "@/components/home/HomePage";
import InventoryPage from "@/components/inventory/InventoryPage";
import ProductPage from "@/components/products/ProductPage";
import { useState } from "react";
import { useMedia } from "@/hooks/useResponsive";

export default function Home() {
  const [childData, setChildData] = useState<string>("");
  const [sideBar, setSideBar] = useState<boolean>(false);
  const getChildData = (data: string) => {
    setChildData(data);
  };

  const mobileDevice = useMedia("(max-width: 768px)");

  return (
    <main className="flex flex-col w-full h-screen">
      <Header onData={getChildData} />
      <div className="flex flex-row w-full mt-[1px]">
        {!mobileDevice && <SideBar onData={getChildData} />}
        {childData === "home" && <HomePage />}
        {childData === "products" && <ProductPage />}
        {childData === "inventory" && <InventoryPage />}
      </div>
    </main>
  );
}
