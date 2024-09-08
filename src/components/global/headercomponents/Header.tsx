import React, { useEffect, useState } from "react";
import styles from "@/styles/global/Header.module.css";
import Image from "next/image";
import Logo from "../../../../public/assets/images/logo.svg";
import { HiOutlineBell } from "react-icons/hi2";
import { IoIosArrowDown } from "react-icons/io";
import { GiHamburgerMenu } from "react-icons/gi";
import { useMedia } from "@/hooks/useResponsive";
import { IoCloseCircle } from "react-icons/io5";

interface Props {
  onData: (data: string) => void;
}

const Header = ({ onData }: Props) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState<string>("home");

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleMenuClick = (menu: string) => {
    toggleSidebar();
    setActiveMenu(menu);
  };

  const mobileDevice = useMedia("(max-width: 768px)");

  useEffect(() => {
    onData(activeMenu);
  }, [onData, activeMenu]);

  return (
    <div className={mobileDevice ? styles.smallContainer : styles.container}>
      {mobileDevice ? (
        <div className={styles.mobileContainer}>
          {!isSidebarOpen && (
            <GiHamburgerMenu
              onClick={toggleSidebar}
              style={{
                width: "30px",
                height: "30px",
                marginLeft: "20px",
              }}
            />
          )}
          {isSidebarOpen && (
            <div className={styles.sideBarDiv}>
              <div className="bg-[#6d31edff]">
                <div className="flex flex-col w-[200px] h-full border-r border-l ">
                  {mobileDevice && (
                    <IoCloseCircle
                      onClick={toggleSidebar}
                      style={{
                        position: "absolute",
                        width: "20px",
                        height: "20px",
                        right: "20px",
                        top: "20px",
                        color: "#fff",
                      }}
                    />
                  )}
                  <div className={styles.logomobileDiv}>
                    <div className="flex items-center justify-center bg-white w-[30px] h-[30px] rounded-[50%]">
                      <Image
                        className=""
                        src={Logo}
                        alt="logo"
                        width={30}
                        height={3}
                      />
                    </div>
                    <label>Inventory App</label>
                  </div>
                  <div className="flex flex-col gap-5 w-[314px] h-[52px] items-start p-5">
                    <div
                      className={
                        activeMenu === "home"
                          ? "flex flex-col gap-[50px] mt-[60px] items-start justify-center bg-white w-1/2 rounded cursor-pointer whitespace-nowrap font-mono text-base leading-[22px] font-normal opacity-100 text-[#6d31edff] border-b-2 pl-5 border-[#6d31edff]"
                          : "flex flex-col gap-[50px] mt-[60px] items-start justify-center bg-white w-1/2 rounded cursor-pointer whitespace-nowrap font-mono text-base leading-[22px] font-normal opacity-100 text-[#565d6dff]"
                      }
                      onClick={() => handleMenuClick("home")}
                    >
                      Home
                    </div>
                    <div
                      className={
                        activeMenu === "products"
                          ? "flex flex-col gap-[50px] items-start justify-center bg-white w-1/2 rounded cursor-pointer whitespace-nowrap font-mono text-base leading-[22px] font-normal opacity-100 text-[#6d31edff] border-b-2 pl-5 border-[#6d31edff]"
                          : "flex flex-col gap-[50px] items-start justify-center bg-white w-1/2 rounded cursor-pointer whitespace-nowrap font-mono text-base leading-[22px] font-normal opacity-100 text-[#565d6dff]"
                      }
                      onClick={() => handleMenuClick("products")}
                    >
                      Products
                    </div>
                    <div
                      className={
                        activeMenu === "inventory"
                          ? "flex flex-col gap-[50px] items-start justify-center bg-white w-1/2 rounded cursor-pointer whitespace-nowrap font-mono text-base leading-[22px] font-normal opacity-100 text-[#6d31edff] border-b-2 pl-5 border-[#6d31edff]"
                          : "flex flex-col gap-[50px] items-start justify-center bg-white w-1/2 rounded cursor-pointer whitespace-nowrap font-mono text-base leading-[22px] font-normal opacity-100 text-[#565d6dff]"
                      }
                      onClick={() => handleMenuClick("inventory")}
                    >
                      Inventory
                    </div>
                  </div>
                </div>
              </div>
              <div className={styles.userInfoMobileDiv}>
                <div className={styles.notificationMpbileDiv}>
                  <div className={styles.notificationsMobile}>4</div>
                  <HiOutlineBell
                    style={{
                      width: "20px",
                      height: "20px",
                      cursor: "pointer",
                      color: "white",
                    }}
                  />
                </div>
                <div className={styles.userMobileInfo}>
                  <div className={styles.nameMobile}>RA</div>
                  <IoIosArrowDown style={{ color: "white" }} />
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <>
          <div className={styles.logoDiv}>
            <Image className="" src={Logo} alt="logo" width={36} height={36} />
            <label>Inventory App</label>
          </div>
          <div className={styles.userInfoDiv}>
            <div className={styles.notificationDiv}>
              <div className={styles.notifications}>4</div>
              <HiOutlineBell
                style={{ width: "20px", height: "20px", cursor: "pointer" }}
              />
            </div>
            <div className={styles.userInfo}>
              <div className={styles.name}>RA</div>
              <IoIosArrowDown />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Header;
