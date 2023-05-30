import { gsap } from "gsap";

import Animation from "@/classes/Animation";
import { split, calculate } from "@/utils/text";
import SplitType from "split-type";
import each from "lodash/each";

type ElementType = HTMLElement | NodeList | null;

export default class Description extends Animation {
  elementLineSpan!: NodeList;
  splitElement!: SplitType;

  constructor({
    element,
    elements,
  }: {
    elements?: Record<string, ElementType>;
    element: ElementType;
  }) {
    super({ element, elements });

    if (this.element && this.element instanceof HTMLElement) {
      //  split({ element: this.element });
      this.splitElement = SplitType.create(this.element, {
        types: "lines",
      });
      this.splitElement = new SplitType(
        this.element.querySelectorAll(".line"),
        {
          types: "lines",
        }
      );
      this.elementLineSpan = this.element.querySelectorAll(
        "span .word"
      ) as NodeList;

      console.log(" this.elementLineSpan", this.elementLineSpan);
    }

    this.resize();
  }

  animateIn() {
    const GSAP = gsap.timeline();

    each(this.splitElement.lines, (element, index) => {
      GSAP.fromTo(
        element,
        {
          yPercent: 100,
          autoAlpha: 0,
        },
        {
          yPercent: 0,
          autoAlpha: 1,
          delay: index * 0.2,
          duration: 1.5,
          ease: "expo.out",
        },
        0
      );
    });
  }

  animateOut() {
    // gsap.set(this.element, { autoAlpha: 0 });
  }

  resize() {
    // this.elementLines = calculate(elementLineSpan);
  }
}
