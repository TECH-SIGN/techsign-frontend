import shortVideo from "../assets/short.mp4";

export type ServiceItem = {
  id: number;
  title: string;
  videoSrc: string;
};

export const SERVICES: ServiceItem[] = [
  {
    id: 1,
    title: "video",
    videoSrc: shortVideo,
  },
];
