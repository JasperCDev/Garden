//@ts-nocheck
/* @refresh reload */
import { render } from "../solid-canvas";

import "./index.css";
import App from "./App";

render(() => <App />, document.getElementById("root") as HTMLElement);
