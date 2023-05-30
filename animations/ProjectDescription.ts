import { gsap } from "gsap";

import Animation from "@/classes/Animation";
import { split, calculate } from "@/utils/text";
import SplitType from "split-type";

type ElementType = HTMLElement | NodeList | null;

export default class ProjectDecription extends Animation {
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

    this.resize();
  }

  animateIn() {
    const GSAP = gsap.timeline();
    GSAP.set(this.element, { autoAlpha: 1 });

    if (this.element && this.element instanceof HTMLElement) {
      const title = this.element.querySelector(
        ".project-d-title"
      ) as HTMLElement;

      this.splitElement = SplitType.create(title, {
        types: "words, chars",
      });
      const paragraph = this.element.querySelector(
        ".project-d-para"
      ) as HTMLElement;

      this.splitElementSummary = SplitType.create(paragraph, {
        types: "lines",
      });
      this.splitElementSummary = new SplitType(
        paragraph.querySelectorAll(".line"),
        {
          types: "lines",
        }
      );

      GSAP.from(this.splitElement.chars, {
        yPercent: 100,
        duration: 0.5,
        ease: "expo.out",
        stagger: { amount: 1, axis: "x" },
      });
      GSAP.fromTo(
        this.splitElementSummary.lines,
        {
          yPercent: 100,
        },
        {
          yPercent: 0,
          autoAlpha: 1,

          stagger: 0.2,
          duration: 1.5,
          ease: "expo.out",
        },
        "<"
      );
    }
  }

  animateOut() {
    gsap.set(this.element, { autoAlpha: 0 });
  }

  resize() {
    // this.elementLines = calculate(elementLineSpan);
  }
}
