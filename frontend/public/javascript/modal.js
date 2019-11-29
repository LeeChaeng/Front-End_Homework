const add_btn = () => {
  document.getElementById("myModal").style.display = "block";
};

const close_btn = () => {
  document.getElementById("myModal").style.display = "none";
};

//모달 창 바깥 클릭시 모달 꺼짐
window.onclick = ev => {
  if (ev.target == document.getElementById("myModal")) {
    document.getElementById("myModal").style.display = "none";
  }
};

const show_income = () => {
  document.getElementById("expense").style.display = "none";
};

const show_expense = () => {
  document.getElementById("expense").style.display = "block";
};

const frmsubmit = () => {
  //라디오 버튼이 눌렸는가 확인 후 수입이라면 수입에 맞는 칸이 있는지 확인 지출이라면 지출에 맞는 칸이 있는지 확인
  if (
    document.getElementById("income_R").checked === false &&
    document.getElementById("expense_R").checked === false
  ) {
    console.log("아무것도 안눌림");
    alert("수입/ 지출을 선택해주세요");
    return false;
  } else if (document.getElementById("income_R").checked) {
    //날짜 가격
    if (
      document.getElementById("date").value === null ||
      document.getElementById("date").value === ""
    ) {
      alert("날짜를 입력해주세요");
      return false;
    } else if (
      document.getElementById("price").value === null ||
      document.getElementById("price").value === ""
    ) {
      alert("가격을 입력해주세요");
      return false;
    }
    return true;
  } else if (document.getElementById("expense_R").checked) {
    //날짜 가격 품목 구입처
    console.log("지출 데이터");
    if (
      document.getElementById("date").value === null ||
      document.getElementById("date").value === ""
    ) {
      alert("날짜를 입력해주세요");
      return false;
    } else if (
      document.getElementById("price").value === null ||
      document.getElementById("price").value === ""
    ) {
      alert("가격을 입력해주세요");
      return false;
    } else if (
      document.getElementById("product").value === null ||
      document.getElementById("product").value === ""
    ) {
      alert("품목을 입력해주세요");
      return false;
    } else if (
      document.getElementById("shop").value === null ||
      document.getElementById("shop").value === ""
    ) {
      alert("구입처를 입력해주세요");
      return false;
    }
    return true;
  }
  return true;
};
