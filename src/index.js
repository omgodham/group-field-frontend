import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "./index.css";
import Routes from "./Routes";
import { ThemeProvider } from "@material-ui/core/styles";
import theme from "./theme";
import {store} from "./redux/store";

import { Provider } from "react-redux";


ReactDOM.render(

    <ThemeProvider theme={theme}>
      <Provider store={store}>
        <Routes />
      </Provider>
    </ThemeProvider>,
  document.getElementById("root")
);
