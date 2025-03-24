import * as React from "react";

interface EmailTemplateProps {
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
}

// Překlad oblastí praxe pro zobrazení v emailu
const translations = {
  corporate: "Korporátní právo",
  litigation: "Sporná agenda",
  family: "Rodinné právo",
  ip: "Duševní vlastnictví",
  "real-estate": "Nemovitosti",
  "estate-planning": "Dědické právo",
};

const getPracticeAreaLabel = (area: keyof typeof translations): string => {
  return translations[area] || area;
};

export const EmailTemplate: React.FC<Readonly<EmailTemplateProps>> = ({
  firstName,
  lastName,
  email,
  phone,
  practiceArea,
  message,
}) => (
  <div
    style={{
      fontFamily: '"Segoe UI", Tahoma, Geneva, Verdana, sans-serif',
      maxWidth: "600px",
      margin: "0 auto",
      padding: "20px",
      backgroundColor: "#f9f9f9",
      borderRadius: "8px",
    }}
  >
    <div
      style={{
        backgroundColor: "#2c3e50",
        padding: "20px",
        borderRadius: "6px 6px 0 0",
        marginBottom: "20px",
      }}
    >
      <h1
        style={{
          color: "#ffffff",
          margin: "0",
          fontSize: "24px",
        }}
      >
        Děkujeme za Váš kontakt, {firstName}!
      </h1>
    </div>

    <div
      style={{
        padding: "0 20px 20px",
        backgroundColor: "#ffffff",
        borderRadius: "0 0 6px 6px",
      }}
    >
      <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#333" }}>
        Obdrželi jsme Vaši zprávu a brzy se Vám ozveme. Níže jsou uvedeny
        informace, které jste nám poskytli:
      </p>

      <table
        style={{
          width: "100%",
          borderCollapse: "collapse",
          marginBottom: "20px",
        }}
      >
        <tr>
          <td
            style={{
              padding: "10px",
              borderBottom: "1px solid #eee",
              width: "40%",
              fontWeight: "bold",
            }}
          >
            Jméno a příjmení:
          </td>
          <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
            {firstName} {lastName}
          </td>
        </tr>
        <tr>
          <td
            style={{
              padding: "10px",
              borderBottom: "1px solid #eee",
              fontWeight: "bold",
            }}
          >
            Email:
          </td>
          <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
            {email}
          </td>
        </tr>
        <tr>
          <td
            style={{
              padding: "10px",
              borderBottom: "1px solid #eee",
              fontWeight: "bold",
            }}
          >
            Telefon:
          </td>
          <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
            {phone}
          </td>
        </tr>
        <tr>
          <td
            style={{
              padding: "10px",
              borderBottom: "1px solid #eee",
              fontWeight: "bold",
            }}
          >
            Oblast práva:
          </td>
          <td style={{ padding: "10px", borderBottom: "1px solid #eee" }}>
            {getPracticeAreaLabel(practiceArea)}
          </td>
        </tr>
      </table>

      <div
        style={{
          backgroundColor: "#f5f5f5",
          padding: "15px",
          borderRadius: "4px",
          marginBottom: "20px",
        }}
      >
        <h3 style={{ margin: "0 0 10px 0", color: "#2c3e50" }}>Vaše zpráva:</h3>
        <p style={{ margin: "0", lineHeight: "1.5", color: "#555" }}>
          {message}
        </p>
      </div>

      <p style={{ fontSize: "16px", lineHeight: "1.5", color: "#333" }}>
        Náš specializovaný právník v oblasti{" "}
        {getPracticeAreaLabel(practiceArea).toLowerCase()} Vás bude kontaktovat
        nejpozději do 48 hodin.
      </p>

      <div
        style={{
          marginTop: "30px",
          padding: "15px",
          borderTop: "1px solid #eee",
          fontSize: "14px",
          color: "#777",
          textAlign: "center",
        }}
      >
        <p style={{ margin: "0 0 10px 0" }}>S pozdravem,</p>
        <p style={{ margin: "0", fontWeight: "bold" }}>
          Vaše advokátní kancelář
        </p>
        <p style={{ margin: "5px 0 0 0" }}>
          +420 123 456 789 | ak@vaseadvokacie.cz
        </p>
        <p style={{ margin: "5px 0 0 0" }}>Právnická 123, 110 00 Praha 1</p>
      </div>
    </div>
  </div>
);
