import { Menu, Scale } from "lucide-react";
import { Button } from "../ui/button";
import Link from "next/link";
import { Sheet, SheetContent, SheetTitle, SheetTrigger } from "../ui/sheet";

const navbarItems = [
  {
    name: "Domů",
    href: "#home",
  },
  {
    name: "O nás",
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
  return (
    <>
      <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="w-full px-8 flex h-16 items-center ">
          <div className="w-1/3">
            <Link
              href="/"
              className="flex items-center gap-2 font-bold text-xl"
            >
              <Scale className="h-6 w-6" />
              <span>AK</span>
            </Link>
          </div>
          <div className="w-1/3 flex justify-center">
            <nav className="hidden md:flex gap-6">
              {navbarItems.map((item, index) => (
                <Link
                  className="hover:scale-105 transition-all duration-200"
                  key={index}
                  href={item.href}
                >
                  <p>{item.name}</p>
                </Link>
              ))}
            </nav>
          </div>
          <div className="w-1/3 flex justify-end">
            <Button asChild className="hidden md:inline-flex">
              <Link href="#kontakty">Domluvit konzultaci</Link>
            </Button>
          </div>
          <Sheet>
            <SheetTrigger asChild>
              <Button variant="outline" size="icon" className="md:hidden">
                <Menu className="h-5 w-5" />
                <span className="sr-only">Toggle menu</span>
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-[300px] sm:w-[400px]">
              <div className="flex flex-col gap-6 text-right *:pr-4 py-6">
                <SheetTitle className="flex mx-auto text-lg gap-2">
                  <Scale className="h-6 w-6" />
                  <span>AK</span>
                </SheetTitle>
                <nav className="flex flex-col gap-4">
                  {navbarItems.map((item, index) => (
                    <Link
                      key={index}
                      href={item.href}
                      className="text-base font-medium transition-colors hover:text-primary"
                    >
                      {item.name}
                    </Link>
                  ))}
                </nav>
                <>
                  <Button asChild className="text-center mt-2 pl-8 mx-2">
                    <Link href="#contact">Schedule Consultation</Link>
                  </Button>
                </>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </header>
    </>
  );
};
