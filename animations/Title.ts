import { gsap } from "gsap";

import Animation from "@/classes/Animation";
import { split, calculate } from "@/utils/text";
import SplitType from "split-type";
import each from "lodash/each";

type ElementType = HTMLElement | NodeList | null;

export default class Title extends Animation {
  elementLineSpan!: NodeList;
  summary!: HTMLElement;
  splitElement!: SplitType;
  splitElementSummary!: SplitType;

  constructor({
    element,
    elements,
  }: {
    elements?: Record<string, ElementType>;
    element: ElementType;
  }) {
    super({ element, elements });
    // this.scrollAnimate();

    if (this.element && this.element instanceof HTMLElement) {
      split({ element: this.element, expression: "" });
      this.splitElement = SplitType.create(this.element, {
        types: "words, chars",
      });
      this.elementLineSpan = this.element.querySelectorAll(
        "span .word"
      ) as NodeList;
    }

    this.summary = document.querySelector(
      '[data-animation="summary"]'
    ) as HTMLElement;
    if (this.summary && this.summary instanceof HTMLElement) {
      this.splitElementSummary = SplitType.create(this.summary, {
        types: "lines",
      });
      this.splitElementSummary = new SplitType(
        this.summary.querySelectorAll(".line"),
        {
          types: "lines",
        }
      );
    }

    this.resize();
  }

  animateIn() {
    const img = document.querySelector(".ascii") as HTMLElement;
    const GSAP = gsap.timeline();
    GSAP.set(this.element, {
      autoAlpha: 1,
    });

    GSAP.from(this.splitElement.chars, {
      yPercent: 100,
      duration: 1.5,
      ease: "expo.out",
      stagger: { amount: 1, axis: "x" },
    });
    GSAP.to(
      this.summary,
      {
        autoAlpha: 1,
      },
      "<"
    );

    GSAP.fromTo(
      this.splitElementSummary.lines,
      {
        yPercent: 100,
        autoAlpha: 0,
      },
      {
        yPercent: 0,
        autoAlpha: 1,
        // delay: index * 0.2,
        stagger: 0.2,
        duration: 1.5,
        ease: "expo.out",

        // scrollTrigger: {
        //   trigger: this.splitElementSummary.lines,
        //   start: "top top",
        //   markers: {
        //     startColor: "red",
        //   },
        // },
      },
      "-=1"
    );
    GSAP.fromTo(
      img,
      {
        autoAlpha: 0,
        scale: 0,
      },
      {
        duration: 1.5,
        autoAlpha: 1,
        ease: "expo.out",
        scale: 1,
      },
      "-=2"
    );
  }

  animateOut() {
    gsap.set(this.element, { autoAlpha: 0 });
  }

  resize() {
    // this.elementLines = calculate(elementLineSpan);
  }
}
