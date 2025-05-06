"use client";

import { useState, useRef, useEffect } from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const formSchema = z.object({
  firstName: z.string().min(2, "Jméno musí mít alespoň 2 znaky"),
  lastName: z.string().min(2, "Příjmení musí mít alespoň 2 znaky"),
  email: z.string().email("Neplatný email"),
  phone: z.string().optional(),
  practiceArea: z.string().min(1, "Vyberte oblast"),
  message: z.string().min(10, "Zpráva musí mít alespoň 10 znaků"),
});

const FormText = ({
  name,
  label,
  form,
}: {
  name: "firstName" | "lastName" | "email" | "phone" | "message";
  label: string;
  form: ReturnType<typeof useForm>;
}) => (
  <FormField
    control={form.control}
    name={name}
    render={({ field }) => (
      <FormItem>
        <FormLabel>{label}</FormLabel>
        <FormControl>
          <Textarea {...field} />
        </FormControl>
        <FormMessage />
      </FormItem>
    )}
  />
);

const ContactUs = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [turnstileToken, setTurnstileToken] = useState("");
  const turnstileRef = useRef(null);

  const form = useForm({
    resolver: zodResolver(formSchema),
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      practiceArea: "",
      message: "",
    },
  });

  useEffect(() => {
    // Setup Cloudflare Turnstile
    window.turnstileCallback = (token) => {
      setTurnstileToken(token);
    };

    const script = document.createElement("script");
    script.src = "https://challenges.cloudflare.com/turnstile/v0/api.js";
    script.async = true;
    script.defer = true;
    document.body.appendChild(script);

    return () => {
      document.body.removeChild(script);
    };
  }, []);

  async function onSubmit(values: any) {
    try {
      setIsSubmitting(true);

      if (!turnstileToken) {
        throw new Error("Prosím potvrďte, že nejste robot");
      }

      const response = await fetch("/api/send", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...values,
          cfTurnstileResponse: turnstileToken,
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Nastala chyba při odesílání zprávy");
      }

      form.reset();
      alert("Zpráva byla úspěšně odeslána. Děkujeme za kontaktování.");

      // Reset Turnstile
      if (window.turnstile && turnstileRef.current) {
        window.turnstile.reset(turnstileRef.current);
        setTurnstileToken("");
      }
    } catch (error: any) {
      alert(error.message);
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="firstName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Jméno</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="lastName"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Příjmení</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Email</FormLabel>
                <FormControl>
                  <Input {...field} type="email" />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Telefon (volitelné)</FormLabel>
                <FormControl>
                  <Input {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="practiceArea"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Oblast práva</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger>
                    <SelectValue placeholder="Vyberte oblast práva" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="bytove-spoluvlastnictvi">
                    Bytové spoluvlastnictví
                  </SelectItem>
                  <SelectItem value="obchodni-pravo">Obchodní právo</SelectItem>
                  <SelectItem value="nemovitosti">Právo nemovitostí</SelectItem>
                  <SelectItem value="smluvni-agenda">Smluvní agenda</SelectItem>
                  <SelectItem value="soudni-spory">Soudní spory</SelectItem>
                  <SelectItem value="vymahani-pohledavek">
                    Vymáhání pohledávek
                  </SelectItem>
                  <SelectItem value="jine">Jiné</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="message"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Zpráva</FormLabel>
              <FormControl>
                <Textarea {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div
          ref={turnstileRef}
          className="cf-turnstile"
          data-sitekey={process.env.NEXT_PUBLIC_CLOUDFLARE_SITE_KEY}
          data-callback="turnstileCallback"
        ></div>
        {!turnstileToken && form.formState.isSubmitted && (
          <p className="text-red-500 text-sm mt-1">
            Prosím potvrďte, že nejste robot
          </p>
        )}

        <Button type="submit" disabled={isSubmitting} className="mt-2">
          {isSubmitting ? "Odesílám..." : "Odeslat"}
        </Button>
      </form>
    </Form>
  );
};

// Add necessary TypeScript declaration for the Turnstile callback
declare global {
  interface Window {
    turnstileCallback: (token: string) => void;
    turnstile: {
      reset: (container: HTMLDivElement) => void;
    };
  }
}

export default ContactUs;
