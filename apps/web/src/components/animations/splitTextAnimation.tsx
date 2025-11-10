// src/components/animations/MyComponent.tsx
import React, { useRef, useEffect } from "react";
import SplitType from "split-type";
import gsap from "gsap";
import type {
  MyComponentProps,
  MyComponentRefs,
  CleanupFn,
  SplitInstance,
  Timeline,
} from "@techsign/shared";

const MyComponent: React.FC<MyComponentProps> = ({
  title,
  subtitle,
  startAnimation = true,
  titleClassName,
  subtitleClassName,
  containerClassName,
}) => {
  const refs: MyComponentRefs = {
    titleRef: useRef<HTMLHeadingElement>(null),
    subtitleRef: useRef<HTMLParagraphElement>(null),
  };

  useEffect(() => {
    if (!startAnimation) return;
    const animateWords = (
      element: HTMLElement | null,
      delay = 0,
    ): CleanupFn | undefined => {
      if (!element) return;

      const split: SplitInstance = new SplitType(element, {
        types: "words",
      }) as SplitInstance;
      const words: HTMLElement[] = Array.from(split.words ?? []);

      if (words.length === 0) {
        split.revert?.();
        return;
      }

      const wrappers: HTMLElement[] = [];
      words.forEach((word) => {
        const parent = word.parentNode;
        if (!parent) return;
        const wrapper = document.createElement("span");
        wrapper.style.display = "inline-block";
        wrapper.style.overflow = "hidden";
        wrapper.style.verticalAlign = "bottom";
        parent.insertBefore(wrapper, word);
        wrapper.appendChild(word);
        wrappers.push(wrapper);
      });

      const tl: Timeline = gsap.timeline();
      tl.from(words, {
        yPercent: 105,
        duration: 0.8,
        ease: "power4.out",
        stagger: 0.15,
        delay,
      });

      return () => {
        tl.kill();
        wrappers.forEach((wrap) => {
          const parent = wrap.parentNode;
          if (!parent) return;
          while (wrap.firstChild) {
            parent.insertBefore(wrap.firstChild, wrap);
          }
          parent.removeChild(wrap);
        });
        split.revert?.();
      };
    };

    const cleanupTitle = animateWords(refs.titleRef.current, 0);
    const cleanupSubtitle = animateWords(refs.subtitleRef.current, 0);

    return () => {
      cleanupTitle?.();
      cleanupSubtitle?.();
    };
  }, [title, subtitle, startAnimation]);

  return (
    <div className={`text-center ${containerClassName ?? ""}`}>
      <h1
        ref={refs.titleRef}
        className={`hero-title ${titleClassName ?? "text-4xl sm:text-5xl lg:text-5xl"} font-bold leading-tight whitespace-pre-liner`}
      >
        {title}
      </h1>
      {subtitle && (
        <p
          ref={refs.subtitleRef}
          className={`mt-6 ${subtitleClassName ?? "text-xl sm:text-xl lg:text-xl"} max-w-3xl mx-auto text-slate-900`}
        >
          {subtitle}
        </p>
      )}
    </div>
  );
};

export default MyComponent;
