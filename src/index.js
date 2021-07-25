import { StrictMode } from "react";
import ReactDOM from "react-dom";
import "antd/dist/antd.css";

import App from "./App";
import { FilterProvider } from "./FilterContext";

const rootElement = document.getElementById("root");
ReactDOM.render(
  <FilterProvider>
    <App />
  </FilterProvider>,
  rootElement
);
