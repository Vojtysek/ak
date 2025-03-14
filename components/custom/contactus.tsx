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

const ContactUs = () => {
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

  function onSubmit(values: z.infer<typeof formSchema>) {
    
    console.log(values);

    form.reset();

  }

  return (
    <Form {...form}>
      <form
        className="flex flex-col gap-4 "
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex gap-4">
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
              <FormLabel>Practice Area</FormLabel>
              <Select onValueChange={field.onChange} defaultValue={field.value}>
                <FormControl>
                  <SelectTrigger className="w-full">
                    <SelectValue placeholder="Vyberte oblast praxe" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="corporate">Corporate</SelectItem>
                  <SelectItem value="litigation">Litigation</SelectItem>
                  <SelectItem value="family">Family</SelectItem>
                  <SelectItem value="ip">IP</SelectItem>
                  <SelectItem value="real-estate">Real Estate</SelectItem>
                  <SelectItem value="estate-planning">
                    Estate Planning
                  </SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormText name="message" label="Zpráva" form={form} />
        <Button type="submit">Odeslat</Button>
      </form>
    </Form>
  );
};

export default ContactUs;
