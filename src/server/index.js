import path from "path";
import express from "express";
import React from "react";
import ReactDom from "react-dom/server";

import App from "../client/components/app";
import Axios from "axios";

const app = express();

app.use(
  "/static",
  express.static(path.join(__dirname, "..", "..", "dist", "static"))
);

app.get("/ssr", async (req, res) => {
  const result = await Axios.get("http://localhost:4000/posts/");
  const posts = result.data;
  const root = (
    <html>
      <body>
        <div id="root">
          <App posts={posts} />
        </div>
        <script
          dangerouslySetInnerHTML={{
            __html: `window.__data__ = ${JSON.stringify(posts)}`,
          }}
        />
        <script src="/static/bundle.js"></script>
      </body>
    </html>
  );

  const html = ReactDom.renderToString(root);
  res.send(html);
});

app.listen(3000, () => console.log("Express is running!"));
