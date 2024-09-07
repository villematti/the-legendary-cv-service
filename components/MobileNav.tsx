"use client";

import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet";
import { sidebarLinks } from "@/constants";
import { cn } from "@/lib/utils";
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import Footer from "./Footer";

const MobileNav = ({ user }: MobileNavProps) => {
  const pathname = usePathname();
  return (
    <section className="w-full max-w-[264px]">
      <Sheet>
        <SheetTrigger>
          <Image
            alt="menu"
            className="cursor-pointer"
            height={30}
            src={"/icons/hamburger.svg"}
            width={30}
          />
        </SheetTrigger>
        <SheetContent className="bg-white border-none" side={"left"}>
          <Link
            className="flex cursor-pointer items-center gap-1 px-4"
            href="/"
          >
            <h1 className="text-26 font-ibm-plex-serif font-bold text-black-1">
              Legendary CV Service
            </h1>
          </Link>
          <div className="mobile-nav-sheet">
            <SheetClose asChild>
              <nav className="flex h-full flex-col gap-6 pt-16 text-white">
                {sidebarLinks.map((item) => {
                  const isActive =
                    pathname === item.route ||
                    pathname.startsWith(`${item.route}/`);
                  return (
                    <SheetClose key={item.route} asChild>
                      <Link
                        key={item.label}
                        className={cn("flex mobilenav-sheet_close w-full", {
                          "bg-bank-gradient": isActive,
                        })}
                        href={item.route}
                      >
                        <p
                          className={cn("text-16 font-semibold text-black-2", {
                            "!text-white": isActive,
                          })}
                        >
                          {item.label}
                        </p>
                      </Link>
                    </SheetClose>
                  );
                })}
              </nav>
            </SheetClose>
            <Footer user={user} type={"mobile"} />
          </div>
        </SheetContent>
      </Sheet>
    </section>
  );
};

export default MobileNav;
