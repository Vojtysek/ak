import { BookOpen, Scale, Users, Shield, Award, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import { JSX } from "react";
import React from "react";

const servicesList: {
  title: string;
  description: string;
  icon: JSX.Element;
}[] = [
  {
    title: "Obchodní právo",
    description:
      "Komplexní právní služby pro podniky všech velikostí, od startupů po zavedené korporace.",
    icon: <BookOpen />,
  },
  {
    title: "Litigace",
    description:
      "Odborné zastupování v občanských a obchodních sporech napříč různými odvětvími.",
    icon: <Scale />,
  },
  {
    title: "Rodinné právo",
    description:
      "Citlivé vedení při rozvodech, opatrovnictví dětí a dalších rodinných právních záležitostech.",
    icon: <Users />,
  },
  {
    title: "Duševní vlastnictví",
    description:
      "Ochrana vašich kreativních děl, vynálezů a značek prostřednictvím patentů, ochranných známek a autorských práv.",
    icon: <Shield />,
  },
  {
    title: "Nemovitosti",
    description:
      "Právní pomoc při transakcích s nemovitostmi, nájmech, územním plánování a sporech týkajících se nemovitostí.",
    icon: <Award />,
  },
  {
    title: "Právo práce",
    description:
      "Poradenství v oblasti pracovního práva, včetně smluvních vztahů, odškodnění a kolektivních smluv.",
    icon: <Clock />,
  },
];

const Services = () => {
  return (
    <>
      {servicesList.map((service, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {React.cloneElement(service.icon, { className: "h-6 w-6" })}
            </div>
            <CardTitle>{service.title}</CardTitle>
          </CardHeader>
          <CardContent>
            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>
          </CardContent>
        </Card>
      ))}
    </>
  );
};

export default Services;
