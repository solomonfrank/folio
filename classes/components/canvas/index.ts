import {
  Box,
  Camera,
  Geometry,
  Mesh,
  OGLRenderingContext,
  Program,
  Renderer,
  Transform,
} from "ogl-typescript";

// import fragment from "../../../shaders/plane-fragment.glsl";
// import vertex from "../../../shaders/plane-vertex.glsl";
import Home from "./Home";

export default class Canvas {
  renderer!: Renderer;
  gl!: OGLRenderingContext;
  camera!: Camera;
  scene!: Transform;
  geometry!: Box;
  program!: Program;
  mesh!: Mesh;
  constructor() {
    this.createRender();
    this.createCamera();
    this.createScene();
    // this.createBox();
    // this.createHome();
  }

  createRender() {
    this.renderer = new Renderer();
    this.gl = this.renderer.gl;

    document.body.appendChild(this.gl.canvas);
    // const container = document.querySelector(".ogl");
    // container?.appendChild(this.gl.canvas);
  }
  onResize() {
    this.renderer.setSize(window.innerWidth, window.innerHeight);
  }

  createCamera() {
    this.camera = new Camera(this.gl);
    this.camera.position.y = 5;
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height,
    });
  }
  createScene() {
    this.scene = new Transform();
  }

  createHome() {
    //  const home = new Home({ gl: this.gl });
  }

  createBox() {
    this.geometry = new Box(this.gl);
    this.program = new Program(this.gl, {});

    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.mesh.setParent(this.scene);
    // requestAnimationFrame(this.update.bind(this));
  }

  update() {
    // if (this.update) {
    //   requestAnimationFrame(this.update.bind(this));
    // }
    //  requestAnimationFrame(this.update.bind(this));

    this.mesh.rotation.y -= 0.04;
    this.mesh.rotation.x += 0.03;
    this.renderer.render({ scene: this.scene, camera: this.camera });
  }
}
