import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { Provider } from "react-redux";
import store from "./store";
import "./styles/fonts/Font.css";
import Modal from "react-modal";
import Token from "./api/Token";
import "./index.css";
// import "swiper/css";
// import "swiper/css/navigation";
// import "swiper/css/pagination";
// import "swiper/css/scrollbar";
// import "swiper/css/effect-cards";
// import { Grid, Pagination, EffectCards } from "swiper/modules";
// import "swiper/css/grid";
const root = ReactDOM.createRoot(document.getElementById("root"));
Modal.setAppElement("#root"); // 또는 원하는 루트 엘리먼트 선택자를 사용
// 배포 환경에서 console.log, console.warn 지우기
if (process.env.NODE_ENV === "production") {
  console.log = function no_console() {};
  console.warn = function no_console() {};
}
root.render(
  <Provider store={store}>
    <Token />
    <App />
  </Provider>,
);
reportWebVitals();
