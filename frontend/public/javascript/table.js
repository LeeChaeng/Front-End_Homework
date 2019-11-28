let data = [];
let dates = [];
let result = [];

var app = angular.module("myApp", []);

app.controller("myCtrl", ($scope, $http) => {
  $http.get("/api/v1/household").then(res => {
    let r_val = $scope;
    r_val.date_array = [];

    data = res.data; //가져온 데이터 집어넣기
    dates = data.pop().sort(); //마지막 날짜 데이터 dates 배열에 집어넣기

    console.log("dates", dates);
    for (let i = 0; i < dates.length; i++) {
      //날짜에 맞는 것 골라서 내림차순으로 sorting후 result 값에 push
      let resu = data.filter(it => it.date.includes(dates[i].date));
      resu.sort((a, b) => (a.shop > b.shop ? -1 : a.shop < b.shop ? 1 : 0)); // shop 이름별 descending

      result.push(resu);
    }
    console.log("result", result);

    // 개수, 총지출, 잔액 계산, 로마자 id에 추가
    for (let i = 0; i < result.length; i++) {
      let count = 0;
      let total_price = 0;
      let remainder = 0 + dates[i].price;
      for (let j = 0; j < result[i].length; j++) {
        count++;
        total_price += result[i][j].price;
        result[i][j].id = romanize(j + 1) + "."; //로마자
      }
      remainder -= total_price;

      //dates에 add & 날짜 변환
      dates[i].count = count;
      dates[i].total_price = total_price;
      dates[i].remainder = remainder;
      dates[i].date = convertDate(dates[i].date);
    }

    r_val.date_array.push(dates);
    r_val.result = result; //최종 데이터 값 result에 집어넣기
  });
});

//로마자로 변경하는 함수
const romanize = num => {
  if (!+num) return false;
  let digits = String(+num).split(""),
    key = [
      "",
      "C",
      "CC",
      "CCC",
      "CD",
      "D",
      "DC",
      "DCC",
      "DCCC",
      "CM",
      "",
      "X",
      "XX",
      "XXX",
      "XL",
      "L",
      "LX",
      "LXX",
      "LXXX",
      "XC",
      "",
      "I",
      "II",
      "III",
      "IV",
      "V",
      "VI",
      "VII",
      "VIII",
      "IX"
    ],
    roman = "",
    i = 3;
  while (i--) roman = (key[+digits.pop() + i * 10] || "") + roman;
  return Array(+digits.join("") + 1).join("M") + roman;
};

//날짜 변환하는 함수
const convertDate = date => {
  let year = date.substr(0, 4);
  let month = date.substr(5, 2);
  let day = date.substr(8, 2);

  return year + "/" + month + "/" + day;
};
