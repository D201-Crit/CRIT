// components/PopUp.js
import React, { useEffect } from "react";
import Swal from "sweetalert2";

const PopUp = ({ icon, title, text }) => {
  useEffect(() => {
    Swal.fire({
      position: "center",
      icon,
      title,
      text,
      showConfirmButton: false,
      timer: 1500,
      background: "#272727",
      color: "white",
    });
  }, []); // 빈 배열을 두어 마운트될 때만 호출되도록 설정

  return null; // 실제로 DOM에는 렌더링되지 않도록 null을 반환
};

export default PopUp;
