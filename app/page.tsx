"use client";

import Link from "next/link";
import {
  ArrowRight,
  Award,
  Clock,
  Linkedin,
  Mail,
  MapPin,
  Phone,
  Shield,
  Users,
} from "lucide-react";
import content from "../lib/content.json";
import { Button } from "@/components/ui/button";
import { Section } from "@/components/custom/section";
import { Navbar } from "@/components/custom/navbar";
import Services from "@/components/custom/services";
import ContactUs from "@/components/custom/contactus";
import { Separator } from "@/components/ui/separator";
import React from "react";
import { Fade } from "@/lib/animations";
import Image from "next/image";

const Home = () => {
  /* const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState<boolean>(false);

  useEffect(() => {
    setMounted(true);
  }, []); */

  return (
    <div className="flex min-h-screen bg-muted flex-col">
      <Navbar /* setTheme={setTheme} theme={theme} mounted={mounted} */ />
      <main className="flex-1 container mx-auto">
        <Section id="home" className="h-[10vh] lg:justify-center">
          <div className="flex flex-row w-full m-0 p-0">
            <div className="px-6 w-full lg:w-1/2">
              <Fade direction="up">
                <h1 className="text-5xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none text-main">
                  {content.home.title}
                </h1>
                <h1 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl/none">
                  {content.home.subtitle}
                </h1>
                <p className="mt-4 text-muted-foreground md:text-xl">
                  {content.home.description}
                </p>
                <div className="my-8 lg:hidden flex items-center justify-center">
                  <Image
                    src={"/hero.jpg"}
                    width={400}
                    height={300}
                    className="rounded-xl"
                    alt=""
                  />
                </div>
                <div className="flex mt-8 flex-col gap-2 min-[400px]:flex-row">
                  <Button
                    /* className={cn(
                          "border-[0.5px] duration-200 rounded-sm bg-transparent",
                          // light mode
                          "shadow-[4px_4px_0px_0px_rgba(0,0,0)] active:shadow-none border-zinc-800 hover:bg-zinc-50 text-zinc-800",
                          // dark mode
                          "dark:border-zinc-600 dark:shadow-[3px_3px_0px_0px_rgba(255,255,255,0.7)] active:dark:shadow-none dark:text-zinc-50 dark:bg-zinc-950"
                        )} */
                    asChild
                    size="xl"
                  >
                    <Link href="#kontakty">
                      {content.home.buttons.consultation}
                    </Link>
                  </Button>
                  <Button asChild variant="outline" size="xl">
                    <Link href="#services">
                      {content.home.buttons.services}
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </Fade>
            </div>
            <div className="w-[0px] lg:w-1/2"></div>
          </div>
        </Section>
        <Section id="about">
          <div className="px-4 md:px-6 flex flex-col justify-center items-center">
            {/* <Fade direction="up"> */}
            <div className="inline-block rounded-lg bg-muted px-3 py-1 text-sm">
              {content.about.description}
            </div>
            <h2 className="text-3xl text-main font-bold tracking-tighter sm:text-5xl">
              {content.about.title}
            </h2>
            <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
              Informace...
            </p>
          </div>
          <div className="mx-6 grid max-w-5xl items-center *:items-center gap-6 py-12 lg:grid-cols-3 lg:gap-12">
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Award className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">
                {content.about.points[0].title}
              </h3>
              <p className="text-muted-foreground text-center">
                {content.about.points[0].description}
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Shield className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">
                {content.about.points[1].title}
              </h3>
              <p className="text-muted-foreground text-center">
                {content.about.points[1].description}
              </p>
            </div>
            <div className="flex flex-col justify-center space-y-4">
              <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <Users className="h-6 w-6" />
              </div>
              <h3 className="text-xl font-bold">
                {content.about.points[2].title}
              </h3>
              <p className="text-muted-foreground text-center">
                {content.about.points[2].description}
              </p>
            </div>
            {/* </Fade> */}
          </div>
          <Separator orientation="horizontal" />
        </Section>
        <Section id="services">
          <div className="px-4 md:px-6">
            <div className="flex flex-col items-center justify-center space-y-4 text-center">
              <div className="space-y-2">
                <div className="inline-block rounded-lg bg-background px-3 py-1 text-sm">
                  Naše odbornost
                </div>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-5xl">
                  {content.services.title}
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  {content.services.description}
                </p>
              </div>
            </div>
            <div className="mx-auto grid max-w-5xl gap-6 py-12 md:grid-cols-2 lg:grid-cols-3">
              <Services />
            </div>
          </div>
        </Section>
        <Section id="kontakty">
          <div className="grid px-4 md:px-6 lg:grid-cols-2 gap-8 lg:gap-12">
            <div className="space-y-4 mt-6">
              <h2 className="text-3xl font-bold">{content.contact.title}</h2>
              <p className="max-w-[600px] text-muted-foreground md:text-xl">
                {content.contact.description}
              </p>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <p>{content.contact.address}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-5 w-5 text-primary" />
                  <p>{content.contact.phone}</p>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-5 w-5 text-primary" />
                  <a href={`mailto:${content.contact.email}`}>
                    {content.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Linkedin className="h-5 w-5  text-primary" />
                  {content.contact.linkedin}
                </div>
                <div className="flex items-center gap-2">
                  <Clock className="h-5 w-5 text-primary" />
                  <p>{content.contact.working_hours}</p>
                </div>
              </div>
            </div>
            <ContactUs />
          </div>
        </Section>
      </main>
      <footer className="w-full border-t bg-background py-6 mt-8 md:py-12">
        <div className="mx-auto container flex flex-col items-center justify-between gap-4 px-4 md:flex-row md:px-6">
          <p className="text-sm text-muted-foreground">
            {content.footer.copyright}
          </p>
          <div className="flex gap-4">
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {content.footer.links.privacy_policy}
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {content.footer.links.terms}
            </Link>
            <Link
              href="#"
              className="text-sm font-medium text-muted-foreground hover:text-primary"
            >
              {content.footer.links.disclaimer}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
