import { Scale, Users, Shield, Award, Clock, House } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import React, { JSX, useState } from "react";
import content from "../../lib/content.json";

const icons: JSX.Element[] = [
  <House key="book" />,
  <Scale key="scale" />,
  <Users key="users" />,
  <Shield key="shield" />,
  <Award key="award" />,
  <Clock key="clock" />,
];

const Services = () => {
  const [selected, setSelected] = useState<null | number>(null);

  return (
    <>
      {content.services.areas.map((service, index) => (
        <Card
          key={index}
          className={
            "hover:border-main/50 transition-all duration-200 hover:scale-104 " +
            (selected !== index && selected !== null ? "blur-xs" : "")
          }
          onMouseEnter={() => {
            setSelected(index);
          }}
          onMouseLeave={() => {
            setSelected(null);
          }}
        >
          <CardHeader className="flex flex-row items-center h-12 gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-primary text-primary-foreground aspect-square">
              {React.cloneElement(icons[index % icons.length], {
                className: "h-5 w-5",
              })}
            </div>
            <CardTitle>{service.title}</CardTitle>
          </CardHeader>
          <CardContent className="h-18">
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
