import { gsap } from "gsap";
// import { CSSRulePlugin } from "gsap/dist/CSSRulePlugin";
import Animation from "@/classes/Animation";
import { split, calculate } from "@/utils/text";
import SplitType from "split-type";

type ElementType = HTMLElement | NodeList | null;

export default class ProjectImg extends Animation {
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

    // this.element = this.element as HTMLElement

    this.resize();
  }

  animateIn() {
    const GSAP = gsap.timeline();

    if (this.element && this.element instanceof HTMLElement) {
      //  const rule = CSSRulePlugin.getRule(".project-img-container::after");
      // this.element.classList.contains("order-first");

      console.log("this.element", this.element);
      //  GSAP.to(".project-wrapper", { autoAlpha: 1 });
      GSAP.to(this.element, {
        duration: 1,
        width: "0%",
        ease: "power1.easeInOut",
      });
    }
  }

  animateOut() {
    gsap.set(this.element, { autoAlpha: 0 });
  }

  resize() {
    // this.elementLines = calculate(elementLineSpan);
  }
}
