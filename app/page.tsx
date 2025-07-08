"use client";

import Link from "next/link";
import * as lucideReact from "lucide-react";
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
  return (
    <div className="flex min-h-screen flex-col bg-muted">
      <Navbar />

      <main className="flex-1 w-full max-w-screen-xl mx-auto px-4 md:px-8">
        {/* Hero Section */}
        <Section
          id="home"
          className="min-h-[80vh] flex flex-col-reverse lg:flex-row items-center justify-between gap-8 py-12"
        >
          <Fade direction="up" className="w-full lg:w-1/2 space-y-4">
            <h2 className="text-2xl flex items-center gap-4 md:text-4xl font-bold text-black/60 tracking-tight">
              {content.home.subtitle}
            </h2>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold tracking-tight text-main">
              <b>{content.home.title}</b>
            </h1>
            <p className="text-muted-foreground md:text-xl">
              {content.home.description}
            </p>
            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl" variant="default">
                <Link href="#kontakty">
                  {content.home.buttons.consultation}
                </Link>
              </Button>
              {/* <Button asChild variant="outline" size="xl">
                <Link href="#services">
                  {content.home.buttons.services}
                  <lucideReact.ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button> */}
            </div>
          </Fade>

          <Fade direction="up" className="w-full lg:w-1/2">
            <div className="relative flex justify-center">
              <Image
                src="/hero.jpg"
                width={320}
                height={320}
                alt="Hero"
                style={{
                  clipPath: "circle(45%)",
                }}
                className="rounded-full object-cover w-64 h-64 md:w-96 md:h-96"
                priority
              />
              <div
                onClick={() => {
                  /* hide icons with data-icon */
                  const icons = document.querySelectorAll("[data-icon]");
                  console.log(icons);
                  icons.forEach((icon) => {
                    icon.classList.add("lg:hidden");
                  });
                }}
              >
                <div data-icon className="border p-4 rounded-full bg-main text-white absolute right-24 hidden lg:flex shadow-md">
                  <lucideReact.Scale className="w-8 h-8" />
                </div>
                <div data-icon className="border p-4 rounded-full bg-main text-white absolute right-42 -bottom-12 hidden lg:flex shadow-md">
                  <lucideReact.Book className="w-8 h-8" />
                </div>
                <div data-icon className="border p-4 rounded-full bg-main text-white absolute left-12   top-24 hidden lg:flex shadow-md">
                  <lucideReact.Pyramid className="w-8 h-8" />
                </div>
              </div>
            </div>
          </Fade>
        </Section>

        {/* About Section */}
        <Section id="about" className="py-16">
          <div className="text-center flex flex-col items-center space-y-6">
            <h2 className="text-3xl sm:text-4xl font-bold text-main">
              {content.about.title}
            </h2>
            <div className="flex flex-col gap-6 px-4 mx-auto text-justify max-w-3xl text-lg text-muted-foreground">
              <p>
                Jmenuji se{" "}
                <b>
                  Mgr. Kateřina Trnková
                </b>{" "}
                a právnímu oboru se věnuji již od roku 2002, kdy jsem po
                absolvování vysokoškolského studia a pracovních stáží v
                zahraničí zahájila svou kariéru v jedné z předních českých
                advokátních kanceláří. Již od počátku jsem se zaměřovala na
                poskytování právních služeb nejen českým, ale i mezinárodním
                klientům, čímž jsem získala cenné zkušenosti v různorodém
                právním prostředí.
              </p>
              <p>
                V roce <b>2009 jsem úspěšně složila advokátní zkoušky</b> a
                stala se členkou České advokátní komory. O rok později, v roce
                2010, jsem se rozhodla vydat vlastní cestou a založila jsem svou
                vlastní advokátní kancelář, která od té doby poskytuje{" "}
                <b>
                  komplexní právní služby jednotlivcům, podnikatelům i
                  korporacím.
                </b>
              </p>
              <p>
                Samozřejmou součástí mé advokátní praxe je{" "}
                <b>
                  zastupování klientů před soudy a dalšími orgány v rámci
                  soudních i mimosoudních řízení
                </b>
                . Kromě samotného zastupování nabízím také právní poradenství,
                konzultace a analýzy v jednotlivých právních odvětvích – vždy s
                důrazem na individuální přístup a maximální profesionalitu.
              </p>
            </div>
          </div>
          <Separator className="my-12" />
        </Section>

        {/* Services Section */}
        <Section id="services" className="py-16">
          <div className="text-center space-y-4">
            <h2 className="text-3xl text-main sm:text-4xl font-bold">
              {content.services.title}
            </h2>
            <p className="mx-auto max-w-2xl text-muted-foreground md:text-xl">
              {content.services.description}
            </p>
          </div>

          <div className="mt-12 grid gap-6 md:grid-cols-2 lg:grid-cols-3 max-w-6xl mx-auto">
            <Services />
          </div>
        </Section>

        {/* Contact Section */}
        <Section id="kontakty" className="py-16">
          <div className="grid gap-12 lg:grid-cols-2">
            <div className="space-y-6">
              <h2 className="text-3xl text-main font-bold">
                {content.contact.title}
              </h2>
              <p className="text-muted-foreground md:text-xl">
                {content.contact.description}
              </p>

              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <lucideReact.MapPin className="h-5 w-5 text-primary" />
                  <span>{content.contact.address}</span>
                </div>
                <div className="flex items-center gap-2">
                  <lucideReact.Phone className="h-5 w-5 text-primary" />
                  <span>{content.contact.phone}</span>
                </div>
                <div className="flex items-center gap-2">
                  <lucideReact.Mail className="h-5 w-5 text-primary" />
                  <a href={`mailto:${content.contact.email}`}>
                    {content.contact.email}
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <lucideReact.Linkedin className="h-5 w-5 text-primary" />
                  <span>{content.contact.linkedin}</span>
                </div>
                <div className="flex items-center gap-2">
                  <lucideReact.Clock className="h-5 w-5 text-primary" />
                  <span>{content.contact.working_hours}</span>
                </div>
              </div>
            </div>

            <ContactUs />
          </div>
        </Section>
      </main>

      <footer className="w-full border-t bg-background py-8">
        <div className="container mx-auto px-4 md:px-6 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground text-center md:text-left">
            {content.footer.copyright}
          </p>
          <div className="flex gap-4 text-sm">
            <Link href="#" className="text-muted-foreground hover:text-primary">
              {content.footer.links.privacy_policy}
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              {content.footer.links.terms}
            </Link>
            <Link href="#" className="text-muted-foreground hover:text-primary">
              {content.footer.links.cookies}
            </Link>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Home;
