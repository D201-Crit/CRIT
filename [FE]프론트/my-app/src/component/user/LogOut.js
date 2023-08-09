import { persistor } from "../../store"; // 경로가 맞는지 확인하세요
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Swal from "sweetalert2";
import { api } from "../../api/api";

const LogOut = () => {
  const user = useSelector((state) => state.users); // useSelector를 통해 userSlice의 상태를 가져옴
  const nav = useNavigate();

  const logOut = () => {
    api
      .post("https://i9d201.p.ssafy.io/api/auth/logout", {
        accessToken: user.accessToken,
        refreshToken: user.refreshToken,
      })
      .then((res) => {
        Swal.fire({
          position: "center",
          icon: "success",
          title: "다시 CRIT!",
          text: "다시 만나요",
          showConfirmButton: false,
          timer: 1500,
          background: "#272727",
          color: "white",
          // width: "500px",
          // 먼지
          // imageUrl: 'https://unsplash.it/400/200',
          // imageWidth: 400,
          // imageHeight: 200,
          // imageAlt: 'Custom image',
        });
        persistor.purge(); // 영구 저장된 모든 상태를 초기화
        nav("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <h3 onClick={logOut}>로그아웃</h3>;
};

export default LogOut;
