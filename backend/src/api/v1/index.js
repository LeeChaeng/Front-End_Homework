import express from "express";
import fs from "fs";

const router = express();

let items = fs.readFileSync("./src/account.json", "utf-8");

router.get("/household", (req, res) => {
  console.log(items);
  res.send(items);
});

export default router;
