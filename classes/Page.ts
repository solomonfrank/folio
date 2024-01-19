import ProjectDecription from "@/animations/ProjectDescription";
import ProjectImg from "@/animations/ProjectImage";
import Title from "@/animations/Title";
import EventEmitter from "events";
import { gsap } from "gsap";
import each from "lodash/each";
import map from "lodash/map";

type ElementType = HTMLElement | NodeList | string;

type SelectorType = {
  [key: string]: ElementType | undefined;
};

type LerpProp = {
  current: number;
  target: number;
  last: number;
  limit: number;
};

export default class Page extends EventEmitter {
  selectorChildren: SelectorType;
  selector: ElementType;
  element!: ElementType;
  elements!: Record<string, ElementType>;
  scroll!: LerpProp;

  animationTitle!: Title[];
  projectImg!: ProjectImg[];
  projectDecription!: ProjectDecription[];
  constructor({
    elements,
    element,
  }: {
    elements?: Record<string, ElementType>;
    element: ElementType;
  }) {
    super();
    this.selector = element;
    this.selectorChildren = {
      ...elements,
      animationTitle: document.querySelectorAll(
        '[data-animation="title"]'
      ) as NodeList,
      summary: document.querySelectorAll(
        '[data-animation="summary"]'
      ) as NodeList,

      projectImg: document.querySelectorAll(
        '[data-animation="projectAnimation"]'
      ) as NodeList,
      projectDescription: document.querySelectorAll(
        '[data-animation="projectDescription"]'
      ) as NodeList,
    };

    // this.prefix = prefix("transform") as string;

    this.create();
  }
  create() {
    this.scroll = {
      target: 0,
      current: 0,
      last: 0,
      limit: 4000,
    };
    if (typeof this.selector === "string") {
      this.element = document.querySelector(this.selector) as HTMLElement;
    } else {
      this.element = this.selector;
    }

    this.elements = {};

    each(this.selectorChildren, (entry, key) => {
      if (entry instanceof HTMLElement || this.element instanceof NodeList) {
        if (entry) {
          this.elements[key] = entry;
        }
      } else {
        if (typeof entry === "string") {
          if (this.element instanceof HTMLElement) {
            const element = this.element.querySelectorAll(entry) as NodeList;
            this.elements[key] = this.element.querySelectorAll(
              entry
            ) as NodeList;
            const vvv = this.elements[key];

            if (element.length === 1) {
              this.elements[key] = this.element.querySelector(
                entry
              ) as HTMLElement;
            }
          }
        }
      }
    });
  }

  show() {
    const animateIn = gsap.timeline();

    return new Promise((resolve) => {
      // animateIn.fromTo(
      //   this.element,
      //   {
      //     autoAlpha: 0,
      //   },
      //   {
      //     autoAlpha: 1,
      //     duration: 5,
      //   }
      // );
      animateIn.set(this.element, {
        autoAlpha: 1,
      });

      animateIn.call(() => {
        this.createAnimation();
        if (this.addEventListener) {
          this.addEventListener();
        }

        resolve("done");
      });
    });
  }

  hide() {
    this.removeEventListener();
    return new Promise((resolve) => {
      gsap.to(this.element, {
        autoAlpha: 0,
        onComplete: resolve,
      });
    });
  }
  onMouseWheel(e: WheelEvent) {
    const { deltaY } = e;

    this.scroll.target += deltaY;
  }

  addEventListener() {
    document.addEventListener("wheel", (e) => {
      this.onMouseWheel(e);
    });
  }

  update() {
    this.scroll.target = gsap.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.target
    );

    if (this.scroll.target < 0.01) {
      this.scroll.target = 0;
    }

    this.scroll.current = gsap.utils.interpolate(
      this.scroll.current,
      this.scroll.target,
      0.1
    );

    this.scroll.current = gsap.utils.clamp(
      0,
      this.scroll.limit,
      this.scroll.current
    );

    if (
      this.elements.sectionName &&
      this.elements.sectionName instanceof HTMLElement
    ) {
      this.elements.sectionName.style.transform = `translateY(-${this.scroll.current}px)`;
    }
  }

  onResize() {
    if (
      this.elements.sectionName &&
      this.elements.sectionName instanceof HTMLElement
    ) {
      this.scroll.limit =
        this.elements.sectionName.clientHeight - window.innerHeight;
    }
  }

  removeEventListener() {}

  lerp() {}

  createAnimation() {
    if (
      this.selectorChildren.animationTitle &&
      this.selectorChildren.animationTitle instanceof NodeList
    ) {
      this.animationTitle = map(
        this.selectorChildren.animationTitle,
        (entry) => {
          return new Title({ element: entry as HTMLElement });
        }
      );

      this.animationTitle.forEach((item) => {
        item.animateIn();
      });
    }

    if (
      this.selectorChildren.projectImg &&
      this.selectorChildren.projectImg instanceof NodeList
    ) {
      this.projectImg = map(this.selectorChildren.projectImg, (entry) => {
        return new ProjectImg({ element: entry as HTMLElement });
      });
    }
    console.log("gg", this.selectorChildren);
    if (
      this.selectorChildren.projectDescription &&
      this.selectorChildren.projectDescription instanceof NodeList
    ) {
      this.projectDecription = map(
        this.selectorChildren.projectDescription,
        (entry) => {
          return new ProjectDecription({ element: entry as HTMLElement });
        }
      );
    }
  }
}
