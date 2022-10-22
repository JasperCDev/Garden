import * as PIXI from "pixi.js";
import { JSXElement } from "solid-js";

interface Props {
  children: JSXElement;
}

export default function Container(props: Props) {
  const container = new PIXI.Container();
  if (typeof props.children === "object") {
    container.addChild(props.children);
  } else {
    const list = props.children();
    list.forEach((c: JSXElement) => container.addChild(c));
  }
  return container;
}
