import { split } from "@/utils/text";
import { gsap } from "gsap";
import each from "lodash/each";
import SplitType from "split-type";
import Component from "./index";

const imagePath = [
  "/assets/images/devp.png",
  "/assets/images/zondo.png",
  "/assets/images/apems.png",
  "/assets/images/cashbox.png",
  "/assets/images/devp.png",
  "/assets/images/tef.png",
  "/assets/images/bandage.webp",
];
type ElementType = HTMLElement | NodeList | null;
export default class Preloader extends Component {
  imageLoadedCount: number = 0;
  newText!: SplitType;
  elements!: Record<string, ElementType>;
  constructor({ elements }: { elements?: Record<string, ElementType> }) {
    super({
      element: document.querySelector(".preloader") as HTMLElement,
      elements: {
        ...elements,
        description: document.querySelector(".intro-title") as HTMLElement,
        assetCounter: document.querySelector(".count") as HTMLElement,
        images: document.querySelectorAll("img") as NodeList,
      },
    });

    this.createLoader();

    if (
      this.elements.description &&
      this.elements.description instanceof HTMLElement
    ) {
      split({ element: this.elements.description, expression: "<br/>" });
      this.newText = new SplitType(this.elements.description, {
        types: "lines",
      });

      this.elements.newspan =
        this.elements.description.querySelectorAll("span span");
    }
  }

  createLoader() {
    if (this.elements.images && this.elements.images instanceof NodeList) {
      each(this.elements.images, (image, key) => {
        //  const imageCopy = image as HTMLImageElement;
        const media = new Image();
        media.src = imagePath[key];
        media.crossOrigin = "anonymous";
        media.onload = (_) => this.onAssetLoaded();

        // const datasrc = imageCopy.getAttribute("data-src");
        // console.log("heree", datasrc);

        // if (datasrc) {
        //   imageCopy.src = datasrc;
        //   imageCopy.onload = () => this.onAssetLoaded(imageCopy);
        // }
      });
    }
  }
  onAssetLoaded() {
    if (this.elements.images && this.elements.images instanceof NodeList) {
      ++this.imageLoadedCount;
      const percent = this.imageLoadedCount / this.elements.images.length;

      const percentStr = `${Math.round(percent * 100)}%`;

      if (
        this.elements.assetCounter &&
        this.elements.assetCounter instanceof HTMLElement
      ) {
        this.elements.assetCounter.innerHTML = percentStr;
        const position = window.innerWidth * percent;

        // gsap.to(this.elements.assetCounter, {
        //   x: position,

        //   ease: "power3.out",
        //   duration: 5,
        // });

        if (percent === 1) {
          this.onLoaded();
        }
      }
    }
  }

  onLoaded() {
    return new Promise((resolve) => {
      const animateOut = gsap.timeline({ delay: 1 });

      animateOut.to(".intro-title .line span", {
        yPercent: 100,
        autoAlpha: 0,
        ease: "expo.out",
        duration: 1.5,
        stagger: {
          from: "start",
          axis: "x",
          amount: 0.8,
        },
      });
      animateOut.to(
        this.elements.assetCounter,
        {
          yPercent: 100,
          autoAlpha: 0,
          ease: "expo.out",
          duration: 1.5,
          stagger: {
            from: "start",
            axis: "x",
            amount: 0.8,
          },
        },
        "-=1"
      );

      animateOut.to(
        this.element,
        {
          scaleY: 0,
          duration: 1.5,
          transformOrigin: "100% 100%",
          onComplete: resolve,
          ease: "expo.out",
        },
        "-=1"
      );

      animateOut.to(
        this.elements.parent,
        {
          autoAlpha: 1,
          ease: "expo.out",
        },
        "-=0.8"
      );
      animateOut.call(() => {
        this.emit("completed");
      });
    });
  }

  destroy() {
    if (this.element instanceof HTMLElement) {
      this.element.parentNode?.removeChild(this.element);
    }
  }
}
