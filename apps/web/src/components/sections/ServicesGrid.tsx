import * as React from "react";
import ServiceCard from "../cards/ServiceCard";
import { SERVICES } from "../../constants/services";

const ServicesGrid: React.FC = () => {
  return (
    <div>
      {SERVICES.map((s) => (
        <ServiceCard key={s.id} videoSrc={s.videoSrc} />
      ))}
    </div>
  );
};

export default ServicesGrid;
