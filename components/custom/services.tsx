import * as lucideReact from "lucide-react";
import * as card from "../ui/card";
import React from "react";
import content from "../../lib/content.json";

const icons = [
  <lucideReact.House key="book" />,
  <lucideReact.Scale key="scale" />,
  <lucideReact.Users key="users" />,
  <lucideReact.Shield key="shield" />,
  <lucideReact.Award key="award" />,
  <lucideReact.Clock key="clock" />,
];

const Services = () => {
  return (
    <>
      {content.services.areas.map((service, index) => (
        <card.Card
          key={index}
          className={
            "hover:border-main/50 transition-all duration-200 hover:scale-105"
          }
        >
          <card.CardHeader className="flex flex-row items-center h-12 gap-4">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border bg-main text-white aspect-square">
              {React.cloneElement(icons[index % icons.length], {
                className: "h-5 w-5",
              })}
            </div>
            <card.CardTitle className="text-black/70">{service.title}</card.CardTitle>
          </card.CardHeader>
          <card.CardContent className="h-18">
            <p className="text-sm text-muted-foreground">
              {service.description}
            </p>
          </card.CardContent>
        </card.Card>
      ))}
    </>
  );
};

export default Services;
