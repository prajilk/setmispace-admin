import { useEffect, useState } from "react";
import { useRef } from "react";
// import SubMenu from "./sub-menu";
import { motion } from "framer-motion";
import {
    ChevronLeft,
    LayoutDashboard,
    // Users,
    Menu,
    // BookText,
    // BadgePercent,
    // Wallet,
    // BarChart3,
    ScrollText,
} from "lucide-react";
import { useMediaQuery } from "react-responsive";
import { NavLink } from "react-router-dom";

const NAVBAR_ACTIVE_STYLE = {
    color: "hsl(var(--primary))",
    "--tw-bg-opacity": "1",
    backgroundColor: "rgb(228 228 231 / var(--tw-bg-opacity))",
};

const Sidebar = () => {
    let isTabletMid = useMediaQuery({ query: "(max-width: 912px)" });
    const [open, setOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        if (isTabletMid) {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [isTabletMid]);

    useEffect(() => {
        isTabletMid && setOpen(false);
    }, [isTabletMid]);

    const Nav_animation = isTabletMid
        ? {
              open: {
                  x: 0,
                  width: "16rem",
                  transition: {
                      damping: 40,
                  },
              },
              closed: {
                  x: -250,
                  width: 0,
                  transition: {
                      damping: 40,
                      delay: 0.15,
                  },
              },
          }
        : {
              open: {
                  width: "16rem",
                  transition: {
                      damping: 40,
                  },
              },
              closed: {
                  width: "4rem",
                  transition: {
                      damping: 40,
                  },
              },
          };

    return (
        <div>
            <div
                onClick={() => setOpen(false)}
                className={`fixed inset-0 z-[48] max-h-screen bg-black/50 lg:hidden ${
                    open ? "block" : "hidden"
                } `}
            ></div>
            <motion.div
                ref={sidebarRef}
                variants={Nav_animation}
                initial={{ x: isTabletMid ? -250 : 0 }}
                animate={open ? "open" : "closed"}
                className="text-gray fixed z-[49] h-screen w-[16rem] max-w-[16rem] overflow-hidden bg-white dark:bg-dark lg:relative"
            >
                <div className="mx-3.5 flex items-center gap-4 py-3 font-medium">
                    <img
                        src="/logo.png"
                        className="flex-shrink-0"
                        alt="icon"
                        width={40}
                        height={45}
                        style={{ width: "auto", height: "auto" }}
                    />
                </div>

                <div className="flex h-full flex-col pb-32">
                    <ul className="scrollbar-thin flex flex-1 flex-col gap-1 overflow-x-hidden whitespace-pre px-2.5 py-5 text-[0.9rem] font-medium md:h-[68%]">
                        <li>
                            <NavLink
                                to="/dashboard"
                                end
                                style={({ isActive }) => {
                                    return isActive ? NAVBAR_ACTIVE_STYLE : {};
                                }}
                                className={`flex cursor-default items-center gap-5 rounded-md p-2.5 font-medium duration-300 md:cursor-pointer`}
                            >
                                <LayoutDashboard
                                    size={23}
                                    className="min-w-max"
                                />
                                Dashboard
                            </NavLink>
                        </li>
                        <div className="flex flex-col">
                            <li>
                                <NavLink
                                    to="/dashboard/listings"
                                    style={({ isActive }) => {
                                        return isActive
                                            ? NAVBAR_ACTIVE_STYLE
                                            : {};
                                    }}
                                    className={`flex cursor-default items-center justify-start rounded-md bg-transparent p-3 font-medium outline-none duration-300 md:cursor-pointer`}
                                >
                                    <ScrollText
                                        size={23}
                                        className="min-w-max"
                                    />
                                    <p className="ml-5 flex-1 text-left capitalize">
                                        Listings
                                    </p>
                                </NavLink>
                            </li>
                            {/* <li>
                                <NavLink
                                    to="/dashboard/revenue"
                                    style={({ isActive }) => {
                                        return isActive
                                            ? NAVBAR_ACTIVE_STYLE
                                            : {};
                                    }}
                                    className={`flex cursor-default items-center justify-start rounded-md bg-transparent p-3 font-medium outline-none duration-300 md:cursor-pointer`}
                                >
                                    <Wallet size={23} className="min-w-max" />
                                    <p className="ml-5 flex-1 text-left capitalize">
                                        Revenue
                                    </p>
                                </NavLink>
                            </li>
                            <SubMenu
                                isOpen={open}
                                data={{
                                    name: "Catalog",
                                    icon: BookText,
                                    menus: [
                                        { title: "Products", url: "/products" },
                                        {
                                            title: "Categories",
                                            url: "/products/categories",
                                        },
                                    ],
                                }}
                            />
                            <SubMenu
                                isOpen={open}
                                data={{
                                    name: "Customer details",
                                    icon: Users,
                                    menus: [
                                        {
                                            title: "Customers",
                                            url: "/customers",
                                        },
                                        {
                                            title: "Addresses",
                                            url: "/customers/addresses",
                                        },
                                    ],
                                }}
                            />
                            <li>
                                <NavLink
                                    to="/dashboard/offers"
                                    style={({ isActive }) => {
                                        return isActive
                                            ? NAVBAR_ACTIVE_STYLE
                                            : {};
                                    }}
                                    className={`flex cursor-default items-center justify-start rounded-md bg-transparent p-3 font-medium outline-none duration-300 md:cursor-pointer`}
                                >
                                    <BadgePercent
                                        size={23}
                                        className="min-w-max"
                                    />
                                    <p className="ml-5 flex-1 text-left capitalize">
                                        Best Deals & Offers
                                    </p>
                                </NavLink>
                            </li>
                            <li>
                                <NavLink
                                    to="/dashboard/site-traffic"
                                    style={({ isActive }) => {
                                        return isActive
                                            ? NAVBAR_ACTIVE_STYLE
                                            : {};
                                    }}
                                    className={`flex cursor-default items-center gap-5 rounded-md p-2.5 font-medium duration-300 md:cursor-pointer`}
                                >
                                    <BarChart3
                                        size={23}
                                        className="min-w-max"
                                    />
                                    Site Traffic
                                </NavLink>
                            </li> */}
                        </div>
                    </ul>
                </div>
                <motion.div
                    onClick={() => {
                        setOpen(!open);
                    }}
                    animate={
                        open
                            ? {
                                  rotate: 0,
                              }
                            : {
                                  rotate: 180,
                              }
                    }
                    transition={{ duration: 0 }}
                    className={`absolute bottom-3 ${
                        open ? "right-2" : "right-5"
                    } z-50 hidden h-fit w-fit cursor-pointer md:block`}
                >
                    <ChevronLeft size={25} />
                </motion.div>
            </motion.div>
            <div
                className="absolute top-3 z-20 m-3 cursor-pointer md:top-5 lg:hidden"
                onClick={() => setOpen(true)}
            >
                <Menu size={25} />
            </div>
        </div>
    );
};

export default Sidebar;
