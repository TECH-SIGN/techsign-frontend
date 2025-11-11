import { useEffect, useRef } from "react";
import gsap from "gsap";
import { AnimatedHeadingProps } from "@techsign/shared";

export default function AnimatedHeading({
  title,
  subtitle = [],
  align = "center",
  delay = 0.3,
}: AnimatedHeadingProps) {
  // Normalize subtitles to string[]
  const subtitleArray = Array.isArray(subtitle) ? subtitle : (subtitle ? [subtitle] : []);

  const titleRef = useRef<HTMLHeadingElement | null>(null);
  const subtitleRefs = useRef<Array<HTMLParagraphElement | null>>([]);

  useEffect(() => {
    const tl = gsap.timeline({
      delay,
      defaults: { ease: "power4.out", duration: 6.0 },
    });

    // 👇 Add label for syncing animations
    tl.addLabel("start");

    if (titleRef.current) {
      tl.fromTo(
        titleRef.current,
        { x: -120, opacity: 0 },
        { x: 0, opacity: 1 },
        "start" // 👈 start with subtitle
      );
    }

    subtitleRefs.current.forEach((line, i) => {
      if (!line) return;
      const fromX = i % 2 === 0 ? 120 : -120;
      tl.fromTo(
        line,
        { x: fromX, opacity: 0 },
        { x: 0, opacity: 1 },
        "start" // 👈 same label = start together
      );
    });
  }, [delay]);

  return (
    <div
      className={`my-20 overflow-hidden flex flex-col ${
        align === "center"
          ? "items-center text-center"
          : align === "right"
          ? "items-end text-right"
          : "items-start text-left"
      }`}
    >
      <div>
        <h1
          ref={titleRef}
          className="text-xl sm:text-2xl lg:text-4xl font-semibold leading-tight text-gray-300 mb-3"
        >
          {title}
        </h1>
      </div>

      <div className="flex flex-col text-4xl sm:text-5xl lg:text-8xl font-bold text-white leading-snug tracking-tight">
        {subtitleArray.map((text, i) => (
          <div key={i} className="overflow-hidden">
            <p
              ref={(el) => {
                subtitleRefs.current[i] = el;
              }}
            >
              {text}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
