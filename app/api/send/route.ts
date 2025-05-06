import { NextResponse } from "next/server";
import { Resend } from "resend";
import { EmailTemplate } from "@/components/templates/email";

const resend = new Resend(process.env.RESEND_API_KEY);

export async function POST(request: Request) {
  try {
    const formData = await request.json();

    // Validate Cloudflare Turnstile token
    const turnstileResponse = await fetch(
      "https://challenges.cloudflare.com/turnstile/v0/siteverify",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          secret: process.env.CLOUDFLARE_SECRET_KEY,
          response: formData.cfTurnstileResponse,
        }),
      }
    );

    const turnstileData = await turnstileResponse.json();

    if (!turnstileData.success) {
      return NextResponse.json(
        { error: "Ověření proti robotům selhalo" },
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
