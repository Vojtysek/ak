"use client";

import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "../ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import FormText from "./formText";
import { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

const ContactUs = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [isVerified, setIsVerified] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  async function handleCaptchaSubmission(token: string | null) {
    try {
      if (token) {
        await fetch("/api", {
          method: "POST",
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ token }),
        });
        setIsVerified(true);
      }
    } catch (e) {
      console.error(e);
      setIsVerified(false);
    }
  }

  const handleChange = (token: string | null) => {
    handleCaptchaSubmission(token);
  };

  function handleExpired() {
    setIsVerified(false);
  }

  const formSchema = z.object({
    firstName: z.string().min(1, "Jméno je povinné"),
    lastName: z.string().min(1, "Příjmení je povinné"),
    email: z.string().email("Neplatná emailová adresa"),
    phone: z.string().regex(/^\+?\d{9,15}$/, "Neplatné telefonní číslo"),
    practiceArea: z
      .enum([
        "corporate",
        "litigation",
        "family",
        "ip",
        "real-estate",
        "estate-planning",
      ])
      .refine((val) => val !== undefined, {
        message: "Vyberte platnou oblast praxe",
      }),
    message: z.string().min(10, "Zpráva musí obsahovat alespoň 10 znaků"),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      practiceArea: "corporate",
      message: "",
    },
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    try {
      setIsSubmitting(true);

      // Volání API endpointu pro odeslání emailu
      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Nastala chyba při odesílání zprávy");
      }

      form.reset();
    } catch (error) {
      console.error("Chyba při odesílání:", error);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex flex-col md:flex-row gap-4">
          <FormText name="firstName" label="Křestní jméno" form={form} />
          <FormText name="lastName" label="Příjmení" form={form} />
        </div>

        <FormText name="email" label="Email" form={form} />
        <FormText name="phone" label="Telefon" form={form} />

        <FormField
          control={form.control}
          name="practiceArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Oblast praxe</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Vyberte oblast praxe" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="corporate">Korporátní právo</SelectItem>
                  <SelectItem value="litigation">Sporná agenda</SelectItem>
                  <SelectItem value="family">Rodinné právo</SelectItem>
                  <SelectItem value="ip">Duševní vlastnictví</SelectItem>
                  <SelectItem value="real-estate">Nemovitosti</SelectItem>
                  <SelectItem value="estate-planning">Dědické právo</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormText name="message" label="Zpráva" form={form} />
        {!isVerified ? (
          <div className="flex justify-center">
            <div className="flex flex-col">
              <ReCAPTCHA
                sitekey={process.env.NEXT_PUBLIC_RECAPTCHA_SITE_KEY || ""}
                ref={recaptchaRef}
                onChange={handleChange}
                onExpired={handleExpired}
              />
              <button
                className="border-solid border-1 border-gray-300 rounded-md p-2 bg-blue-500 text-white disabled:bg-gray-300 disabled:text-gray-500 disabled:cursor-not-allowed"
                type="submit"
                disabled={!isVerified}
              >
                Submit Form
              </button>
            </div>
          </div>
        ) : (
          <>
            <Button type="submit" disabled={isSubmitting} className="mt-2">
              {isSubmitting ? "Odesílám..." : "Odeslat"}
            </Button>
          </>
        )}
      </form>
    </Form>
  );
};

export default ContactUs;
