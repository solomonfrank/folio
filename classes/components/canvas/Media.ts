import {
  Mesh,
  OGLRenderingContext,
  Plane,
  Program,
  Texture,
  Transform,
} from "ogl-typescript";
import Component from "..";

type ElementType = HTMLElement | NodeList | null;

export default class Media {
  element: HTMLImageElement;
  geometry: Plane;
  program!: Program;
  mesh!: Mesh;
  gl: OGLRenderingContext;
  scene: Transform;
  texture!: Texture;
  image!: HTMLImageElement;

  constructor({
    element,
    geometry,
    gl,
    scene,
  }: {
    element: HTMLImageElement;
    geometry: Plane;
    gl: OGLRenderingContext;
    scene: Transform;
  }) {
    this.element = element;
    this.geometry = geometry;
    this.gl = gl;
    this.scene = scene;

    this.createTexture();
    this.createProgram();
    this.createMesh();
  }

  createTexture() {
    this.texture = new Texture(this.gl);

    this.image = new Image();
    this.image.src = this.element.src;

    this.image.onload = () => {
      this.texture.image = this.image;
    };
  }

  createMesh() {
    this.mesh = new Mesh(this.gl, {
      geometry: this.geometry,
      program: this.program,
    });
    this.mesh.setParent(this.scene);
  }

  createProgram() {
    this.program = new Program(this.gl, {
      vertex: "",
      fragment: "",
      uniforms: {},
    });
  }
}
