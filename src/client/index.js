import React from "react";
import ReactDOM from "react-dom";

import App from "./components/app";

const app = <App items={window.__data__} />;

ReactDOM.hydrate(app, document.getElementById('root'))