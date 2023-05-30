import Page from "@/classes/Page";

export class Home extends Page {
  constructor() {
    super({
      element: ".home",
      elements: {
        header: ".header",
        sectionName: document.querySelector(".sectionWrapper") as HTMLElement,
        animationTitles: '[data-animation="title"]',
      },
    });
  }
}
