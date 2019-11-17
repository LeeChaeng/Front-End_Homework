import express from "../node_modules/express";
import bodyParser from "../node_modules/body-parser";
import path from "path";
import fs from "fs";

import api from "./api";

const app = express();
const port = 4000;

//서버에서 오류 났을 시 catch 후 500 Error 전송
app.use(function(err, req, res, next) {
  console.error(err.stack);
  return res.status(500).json({ code: 0 });
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", api);

//static 경로 지정
app.use(
  express.static(path.resolve(__dirname, "..", "..", "frontend", "public"))
);

app.use(
  express.static(
    path.resolve(__dirname, "..", "..", "frontend", "public", "html"),
    { extensions: ["html"] }
  )
);

app.listen(port, () => {
  console.log("\x1b[35m", "Api server is running at", port);
});
