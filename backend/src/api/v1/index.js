import express from "express";
import fs from "fs";

const router = express();

router.get("/household", (req, res) => {
  let items = fs.readFileSync("../account.json", "utf-8");

  //JSON parse
  let item = JSON.parse(items);
  let income_data = []; //type=income 데이터만 담아서 보내기

  //날짜 중복 걸러서 count_date 배열에 담아 보내기
  const count_date = item.reduce((acc, cur) => {
    return acc.includes(cur.date) ? acc : [...acc, cur.date];
  }, []);

  //날짜에 수입이 있는지 확인 후 income_data
  for (let i = 0; i < count_date.length; i++) {
    let ck = 0;
    for (let j = 0; j < item.length; j++) {
      if (count_date[i] === item[j].date && item[j].type === "income") {
        ck = 1;
        income_data.push(item[j]);
        item.splice(j, 1);
        break;
      }
    }
    if (ck === 0) {
      let data = { date: "", type: "income", price: 0 };
      data.date = count_date[i];

      income_data.push(data);
    }
  }

  income_data.sort((a, b) => {
    let dateA = new Date(a["date"]).getTime();
    let dateB = new Date(b["date"]).getTime();
    return dateA > dateB ? 1 : -1;
  });

  item.push(income_data);
  //item 최종 보내기
  res.send(item);
});

router.post("/appendData", (req, res) => {
  let items = fs.readFileSync("../account.json", "utf-8");
  let isExist = false;
  //JSON parse
  let item = JSON.parse(items);
  let obj = {};

  obj.date = req.body.date;
  obj.type = req.body.chk_type;
  obj.price = Number(req.body.price);

  //받아온 데이터 처리
  if (req.body.chk_type === "expense") {
    obj.product = req.body.product;
    obj.shop = req.body.shop;
  } else if (req.body.chk_type === "income") {
    // 수입이라면 원래 있던 데이터가 있는지 확인 후 plus
    for (let i = 0; i < item.length; i++) {
      if (item[i].type === "income" && item[i].date === obj.date) {
        item[i].price += obj.price;

        console.log("데이터 ", item[i].price, obj.price);
        isExist = true;
        break;
      }
    }
  }

  //존재하지 않는다면 item 값에 append
  if (!isExist) {
    item.push(obj);
  }

  //파일 작성
  fs.writeFile("../account.json", JSON.stringify(item), err => {
    if (err) {
      //에러 코드 500 반환 후 에러 메세지
      console.log(err);
      res.status(500).send("Server Error");
    }
    res.redirect("/");
  });
});

export default router;
