import { Menu, Scale } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import Image from "next/image";
import * as sheet from "../ui/sheet";
import content from "../../lib/content.json";
import { useState } from "react";

const navbarItems = [
  {
    name: "Domů",
    href: "#home",
  },
  {
    name: "O mně",
    href: "#about",
  },
  {
    name: "Oblasti praxe",
    href: "#services",
  },
  {
    name: "Kontakt",
    href: "#kontakty",
  },
];

export const Navbar = () => {
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full px-8 flex h-16 items-center justify-between ">
          <div className="">
            <Link
              href="/"
              className="flex items-center gap-2 w-fit font-bold text-xl"
            >
              {/* <Scale className="h-6 w-6" /> */}
              <Image src={"logo2.svg"} alt={"Logo"} width={40} height={40} />
              <span className="text-black/50">AK</span>
            </Link>
          </div>
          <div className=" flex justify-center">
            <nav className="hidden md:flex gap-6">
              {navbarItems.map((item, index) => (
                <Link
                  className="hover:scale-105 transition-all duration-200"
                  key={index}
                  href={item.href || ""}
                >
                  <p>{item.name}</p>
                </Link>
              ))}
            </nav>
          </div>
          <div className=" flex gap-2 justify-end">
            <Button asChild className="hidden md:inline-flex">
              <Link href="#kontakty">Domluvit konzultaci</Link>
            </Button>
          </div>
          <sheet.Sheet open={isSheetOpen} onOpenChange={setIsSheetOpen}>
            <sheet.SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </sheet.SheetTrigger>
            <sheet.SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 text-right *:pr-4 py-6">
                <sheet.SheetTitle className="flex mx-auto text-lg gap-2">
                  <Scale className="h-6 w-6" />
                  <span>AK</span>
                </sheet.SheetTitle>
                <nav className="flex flex-col gap-4">
                  {navbarItems.map((item, index) => (
                    <Link
                      onClick={() => setIsSheetOpen(false)}
                      key={index}
                      href={item.href || ""}
                      className="text-base font-medium transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <div className="flex items-center mx-auto min-w-max gap-2">
                  <Button asChild className="text-center">
                    <Link
                      onClick={() => setIsSheetOpen(false)}
                      href="#kontakty"
                    >
                      {content.home.buttons.consultation}
                    </Link>
                  </Button>
                  {/* <Button
                    className="w-max"
                    variant="outline"
                    onClick={() =>
                      props.setTheme(props.theme === "dark" ? "light" : "dark")
                    }
                  >
                    {props.mounted && props.theme === "dark" ? (
                      <Sun className="h-5 w-5" />
                    ) : (
                      <Moon className="h-5 w-5" />
                    )}
                  </Button> */}
                </div>
              </div>
            </sheet.SheetContent>
          </sheet.Sheet>
        </div>
      </header>
    </>
  );
};
