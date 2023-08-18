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
      .post(
        "https://i9d201.p.ssafy.io/api/auth/logout",
        {
          accessToken: user.accessToken,
          refreshToken: user.refreshToken,
        },
        {
          headers: {
            Authorization: `Bearer ${user.refreshToken}`,
          },
        }
      )
      .then((res) => {
        persistor.purge(); // 영구 저장된 모든 상태를 초기화
        nav("/");
        window.location.reload();
      })
      .catch((err) => {
        console.log(err);
      });
  };
  return <h3 onClick={() => logOut()}>로그아웃</h3>;
};

export default LogOut;
