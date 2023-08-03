import React, { useEffect } from "react";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const PopUp = ({ type, title, text, redirect }) => {
  const nav = useNavigate();

  useEffect(() => {
    const showPopup = () => {
      Swal.fire({
        position: "center",
        icon: type,
        title,
        text,
        showConfirmButton: false,
        timer: 1500,
        background: "#272727",
        color: "white",
      }).then(() => {
        if (redirect) {
          nav(redirect); // redirect 프로퍼티가 존재하는 경우 해당 주소로 리다이렉트
        }
      });
    };

    showPopup();
  }, [type, title, text, nav, redirect]);

  return null;
};

export default PopUp;
