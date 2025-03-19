import { BookOpen, Scale, Users, Shield, Award, Clock } from "lucide-react";
import { Card, CardHeader, CardTitle, CardContent } from "../ui/card";
import React, { JSX } from "react";
import content from "../../lib/content.json";

const icons: JSX.Element[] = [
  <BookOpen />,
  <Scale />,
  <Users />,
  <Shield />,
  <Award />,
  <Clock />,
];

const Services = () => {
  return (
    <>
      {content.services.areas.map((service, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
              {React.cloneElement(icons[index % icons.length], {
                className: "h-6 w-6",
              })}
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
