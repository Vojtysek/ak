// app/api/email/route.ts
import { EmailTemplate } from "../../../components/templates/test";
import { Resend } from "resend";
import { NextRequest, NextResponse } from "next/server";

const resend = new Resend(process.env.RESEND_API_KEY);

// Definice typu pro data z formuláře
type EmailFormData = {
  firstName: string;
  lastName: string;
  email: string;
  phone: string;
  practiceArea:
    | "corporate"
    | "litigation"
    | "family"
    | "ip"
    | "real-estate"
    | "estate-planning";
  message: string;
};

export async function POST(request: NextRequest) {
  try {
    // Získání dat z požadavku
    const formData = (await request.json()) as EmailFormData;

    // Kontrola, zda jsou všechna potřebná data k dispozici
    if (!formData.firstName || !formData.email || !formData.message) {
      return NextResponse.json(
        { error: "Chybí povinné údaje" },
        { status: 400 }
      );
    }

    // Odeslání emailu pomocí Resend
    const { data, error } = await resend.emails.send({
      from: process.env.EMAIL_FROM || "AK <onboarding@resend.dev>",
      to: [process.env.EMAIL_TO || "ojta@post.cz"],
      cc: formData.email, // Kopie emailu odesílateli jako potvrzení
      subject: "Nová zpráva z webu advokátní kanceláře",
      react: await EmailTemplate({
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        phone: formData.phone,
        practiceArea: formData.practiceArea,
        message: formData.message,
      }),
    });

    if (error) {
      console.error("Chyba při odesílání emailu:", error);
      return NextResponse.json({ error: error.message }, { status: 500 });
    }

    return NextResponse.json({
      success: true,
      data,
      message: "Email byl úspěšně odeslán",
    });
  } catch (error) {
    console.error("Neočekávaná chyba:", error);
    const errorMessage =
      error instanceof Error ? error.message : "Došlo k neočekávané chybě";
    return NextResponse.json({ error: errorMessage }, { status: 500 });
  }
}
