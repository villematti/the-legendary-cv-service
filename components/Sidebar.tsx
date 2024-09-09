"use client";

import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const Sidebar = ({ user }: SiderbarProps) => {
  const pathname = usePathname();
  return (
    <section className="sidebar">
      <nav className="flex flex-col">
        <Link className="flex mb-12 cursor-pointer items-center gap-2" href="/">
          <h1 className="sidebar-logo">Legendary CV Service</h1>
        </Link>
        {sidebarLinks.map((item) => {
          const isActive =
            pathname === item.route || pathname.startsWith(`${item.route}/`);
          return (
            <Link
              key={item.label}
              className={cn("sidebar-link border-b border-b-slate-200", {
                "bg-bank-gradient": isActive,
              })}
              href={item.route}
            >
              <div className="relative size-4">
                <Image
                  fill
                  alt={item.label}
                  className={cn({ "brightness-[3] invert-0": isActive })}
                  src={item.imgURL}
                />
              </div>
              <p
                className={cn("sidebar-label", {
                  "!text-white": isActive,
                })}
              >
                {item.label}
              </p>
            </Link>
          );
        })}
      </nav>
      <Footer user={user} type={"desktop"} />
    </section>
  );
};

export default Sidebar;
