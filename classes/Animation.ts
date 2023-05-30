import { gsap } from "gsap";
import Component from "./components";

type ElementType = HTMLElement | NodeList | null;

export default class Animation extends Component {
  observer!: IntersectionObserver;

  constructor({
    elements,
    element,
  }: {
    elements?: Record<string, ElementType>;
    element: ElementType;
  }) {
    super({ element, elements });

    this.createObserver();
  }

  createObserver() {
    const element = this.element as HTMLElement;

    const attribute = element.getAttribute("data-animation");

    console.log("attribute", attribute);
    this.observer = new IntersectionObserver(
      (entries: IntersectionObserverEntry[]) => {
        console.log("onss", this.element);

        entries.forEach((entry) => {
          const dimension = element.getBoundingClientRect();
          const top = dimension.top;

          if (entry.isIntersecting && entry.intersectionRatio) {
            this.animateIn();
            this.observer.unobserve(entry.target);
            //  this.scrollAnimate();
          } else {
            // this.animateOut();
          }
        });
      },
      { threshold: 0.6 }
    );

    if (attribute && attribute !== "title") {
      this.observer.observe(this.element as HTMLElement);
    }
  }

  animateIn() {
    const GSAP = gsap.timeline();
    GSAP.fromTo(
      this.element,
      { autoAlpha: 0 },
      { autoAlpha: 1, duration: 1.5 }
    );
  }

  animateOut() {
    gsap.set(this.element, { autoAlpha: 0 });
  }
}
