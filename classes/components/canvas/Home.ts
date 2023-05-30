import each from "lodash/each";
import { OGLRenderingContext, Plane, Transform } from "ogl-typescript";
import Media from "./Media";

export default class Home {
  medias: NodeList;
  gl: OGLRenderingContext;
  geomtry!: Plane;
  scene!: Transform;
  group: Transform;

  constructor({ gl, scene }: { gl: OGLRenderingContext; scene: Transform }) {
    this.medias = document.querySelectorAll(".project-img") as NodeList;
    this.gl = gl;
    this.group = new Transform();
    this.group.setParent(scene);
    this.createScene();
    this.createGallery();
    this.createGeometry();
  }

  createGallery() {
    each(this.medias, (entry, key) => {
      return new Media({
        element: entry as HTMLImageElement,
        geometry: this.geomtry,
        gl: this.gl,
        scene: this.scene,
      });
    });
  }

  createGeometry() {
    this.geomtry = new Plane(this.gl);
  }
  createScene() {
    this.scene = new Transform();
  }
}
