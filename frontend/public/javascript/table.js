window.onload = () => {
  getReady();
};

const getReady = () => {
  axios.get("/api/v1/household").then(res => {
    console.log(res);
  });
};
