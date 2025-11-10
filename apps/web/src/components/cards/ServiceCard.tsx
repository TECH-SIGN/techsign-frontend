import * as React from "react";
import { cn } from "@techsign/shared";
import type { ServiceCardProps } from "@techsign/shared";
import ZoomOutOnLoad from "../animations/ZoomOutOnLoad";

const ServiceCard: React.FC<ServiceCardProps> = ({
  title,
  className,
  videoSrc,
  overlay = true,
  ...props
}) => {
  return (
    <div className={cn()} {...props}>
      <h3 className="font-semibold">{title}</h3>
      {videoSrc ? (
        <ZoomOutOnLoad>
          <div className="relative h-[85vh] w-full rounded-[40px] overflow-hidden">
            <video
              className="block w-full h-full object-cover rounded-[40px]"
              src={videoSrc}
              preload="metadata"
              muted
              playsInline
              autoPlay
              loop
            />
            {overlay && (
              <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-black/10 to-black/30 rounded-[40px]" />
            )}
          </div>
        </ZoomOutOnLoad>
      ) : null}
    </div>
  );
};

export default ServiceCard;
