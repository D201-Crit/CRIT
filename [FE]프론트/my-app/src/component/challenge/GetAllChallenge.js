import { useDispatch, useSelector } from "react-redux";
import { setChallenge } from "../../slice/ChallengeSlice";
import { useEffect } from "react";
import { api } from "../../api/api";

const GetAllChallenge = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);

  const allChallenge = () => {
    api
      .get("https://i9d201.p.ssafy.io/api/challenge/list/all", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        dispatch(setChallenge(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    allChallenge();
  }, []);
  return;
};

export default GetAllChallenge;
