const add_btn = () => {
  document.getElementById("myModal").style.display = "block";
  console.log("gd");
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
