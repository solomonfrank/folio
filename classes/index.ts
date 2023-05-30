import Canvas from "./components/canvas";
import { Home, About } from "@/core";
import Page from "./Page";
import each from "lodash/each";
import Preloader from "./components/preloader";
import Component from "./components";

type Pages = "Home" | "About" | "Work";

type page = Page;

let canvas: Canvas;

export default class CoreApp {
  pages!: {
    [key in Pages]?: Page;
  };

  pageName: Pages;
  preloader!: Preloader;
  canvas!: Canvas;

  page!: page;
  constructor({ pageName }: { pageName: Pages }) {
    this.pageName = pageName;

    this.createPage();
    this.createPreloader();

    if (!canvas) {
      // this.createCanvas();
    }

    this.update();
    // this.addEventistener();
  }

  createCanvas() {
    this.canvas = new Canvas();
  }

  createPage() {
    switch (this.pageName) {
      case "Home":
        this.page = new Home() as Home;
        // this.page.show();
        this.page.once("home", () => {
          this.page.show();
        });
      case "About":
      // this.page = new About() as About;
      //this.page.
      default:
        console.log("somethinh went wrong");
    }
  }

  createPreloader() {
    // this.page.hide();

    console.log("this.pageName", this.pageName);
    this.preloader = new Preloader({
      elements: {
        parent: document.querySelector(`.${this.pageName}`) as HTMLElement,
      },
    });

    this.preloader.once("completed", this.onPreloaded.bind(this));
  }

  onPreloaded() {
    this.page.emit("home");
    this.preloader.destroy();
  }

  async onChange(url: string) {
    this.page.hide();
    const request = await window.fetch(url);
    if (request.status === 200) {
      const html = await request.text();
      const div = document.createElement("div");
      div.innerHTML = html;
      const divContent = div.querySelector(".content");
      //   this.template = divContent.getAttribute("data-template");
      //   this.page = this.pages[this.template];
      //   this.content.setAttribute("data-template", this.template);
      //   this.content.innerHTML = divContent;
      this.page.create();
      this.page.show();
    }
  }

  onResize() {
    if (this.canvas && this.canvas.onResize) {
      this.canvas.onResize();
    }

    if (this.page && this.page.onResize) {
      this.page.onResize();
    }
  }

  addLinkListener() {
    const links = document.querySelectorAll("a");
    each(links, (link, key) => {
      link.onclick = (event) => {
        const { href } = link;
        event.preventDefault();
        this.onChange(href);
      };
    });
  }

  update() {
    if (this.page && this.page && this.page?.update !== undefined) {
      this.page.update();
    }

    if (this.canvas && this.canvas?.update !== undefined) {
      this.canvas.update();
    }

    const frame = requestAnimationFrame(this.update.bind(this));
  }

  addEventistener() {
    window.addEventListener("resize", this.onResize.bind(this));
  }
}
