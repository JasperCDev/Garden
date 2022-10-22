import * as PIXI from "pixi.js";
import { JSXElement } from "solid-js";
import { createRenderer } from "solid-js/universal";
import { gameStore } from "./src/stores/gameStore";

const PROPERTIES = new Set(["className", "textContent"]);

export const {
  render,
  effect,
  memo,
  createComponent,
  createElement,
  createTextNode,
  insertNode,
  insert,
  spread,
  setProp,
  mergeProps,
} = createRenderer<
  PIXI.DisplayObject | PIXI.Container<PIXI.DisplayObject> | JSXElement
>({
  createElement(string) {
    console.log("createElement: ", string);
    return document.createElement(string);
  },
  createTextNode(value) {
    console.log("createTextNode: ", value);
    return new PIXI.Text(value);
  },
  replaceText(textNode, value) {
    console.log("replaceText: ", textNode, value);
    textNode.data = value;
  },
  setProperty(node, name, value) {
    console.log("setProperty: ", node, name, value);
    if (name === "style") Object.assign(node.style, value);
    else if (name.startsWith("on")) node[name.toLowerCase()] = value;
    else if (PROPERTIES.has(name)) node[name] = value;
    else node.setAttribute(name, value);
  },
  insertNode(parent, node, anchor) {
    console.log("insertNode: ", parent, node, anchor);
    if (parent.tagName === "CANVAS")
      return gameStore.pixiApp.stage.addChild(node);
  },
  isTextNode(node) {
    console.log("isTextNode: ", node);
    return node?.type === 3;
  },
  removeNode(parent, node) {
    console.log("removeNode: ", parent, node);
    parent.removeChild(node);
  },
  getParentNode(node) {
    console.log("getParentNode: ", node);
    return node.parent;
  },
  getFirstChild(node) {
    console.log("getFirstChild: ", node);
    return node?.firstChild || null;
  },
  getNextSibling(node) {
    console.log("getNextSibling: ", node);
    return node.nextSibling;
  },
});

// Forward Solid control flow
export {
  For,
  Show,
  Suspense,
  SuspenseList,
  Switch,
  Match,
  Index,
  ErrorBoundary,
} from "solid-js";
