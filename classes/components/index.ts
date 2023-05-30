import Title from "@/animations/Title";
import { gsap } from "gsap";
import each from "lodash/each";
import EventEmitter from "events";

type ElementType = HTMLElement | NodeList | null;

type SelectorType = {
  [key: string]: ElementType | undefined;
};

export default class Component extends EventEmitter {
  selectorChildren: SelectorType;
  selector: ElementType;
  element!: ElementType;
  elements!: Record<string, ElementType>;
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
    };

    this.create();
    this.addEventListener();
  }
  create() {
    this.element = this.selector;

    this.elements = {};

    each(this.selectorChildren, (entry, key) => {
      if (entry instanceof HTMLElement || entry instanceof NodeList) {
        if (entry) {
          this.elements[key] = entry;
        }
      } else {
        // if (typeof entry === "string") {
        //   if (this.element instanceof HTMLElement) {
        //     const element = this.element.querySelectorAll(entry) as NodeList;
        //     this.elements[key] = this.element.querySelectorAll(
        //       entry
        //     ) as NodeList;
        //     const vvv = this.elements[key];
        //     if (element.length === 1) {
        //       this.elements[key] = this.element.querySelector(
        //         entry
        //       ) as HTMLElement;
        //     }
        //   }
        // }
      }
    });
  }

  addEventListener() {}

  removeEventListener() {}
}
