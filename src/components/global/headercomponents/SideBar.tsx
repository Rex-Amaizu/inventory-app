"use client";
import React, { useEffect, useState } from "react";
import styles from "@/styles/global/SideBar.module.css";
import { IoCloseCircle } from "react-icons/io5";
import { useMedia } from "@/hooks/useResponsive";

interface Props {
  onData: (data: string) => void;
}

const SideBar = ({ onData }: Props) => {
  const [activeMenu, setActiveMenu] = useState<string>("home");

  const mobileDevice = useMedia("(max-width: 768px)");

  const handleMenuClick = (menu: string) => {
    setActiveMenu(menu);
  };

  useEffect(() => {
    onData(activeMenu);
  }, [activeMenu, onData]);
  return (
    <div className={styles.container}>
      <div className={styles.headerMenu}>
        <div
          className={
            activeMenu === "home"
              ? styles.headerMenuItemActive
              : styles.headerMenuItem
          }
          onClick={() => handleMenuClick("home")}
        >
          Home
        </div>
        <div
          className={
            activeMenu === "products"
              ? styles.headerMenuItemActive
              : styles.headerMenuItem
          }
          onClick={() => handleMenuClick("products")}
        >
          Products
        </div>
        <div
          className={
            activeMenu === "inventory"
              ? styles.headerMenuItemActive
              : styles.headerMenuItem
          }
          onClick={() => handleMenuClick("inventory")}
        >
          Inventory
        </div>
      </div>
    </div>
  );
};

export default SideBar;
