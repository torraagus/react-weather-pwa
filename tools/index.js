import path from "path";
import fs from "fs";
import React from "react";
import ReactDom from "react-dom/server";

import App from "../src/client/components/app";
import Axios from "axios";

(async () => {
  const result = await Axios.get("http://localhost:4000/posts/");
  const posts = result.data;
  const root = (
    <html>
      <body>
        <div id="root">
          <App items={posts} />
        </div>
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  );

  const html = ReactDom.renderToStaticMarkup(root);
  const staticPath = path.join(__dirname, "..", "dist", "static");

  fs.writeFile(path.join(staticPath, "home.html"), html, (err) => {
    if (err) {
      console.log(err);
      throw err;
    }
    console.log("Complete!");
  });
})();
