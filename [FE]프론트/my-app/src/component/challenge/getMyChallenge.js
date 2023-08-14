import { useDispatch, useSelector } from "react-redux";
import { setMyChallenge } from "../../slice/ChallengeSlice";
import { useEffect } from "react";
import { api } from "../../api/api";

const GetMyChallenge = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);

  const myChallenge = () => {
    api
      .get("https://i9d201.p.ssafy.io/api/challenge/list/mine", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        dispatch(setMyChallenge(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    myChallenge();
  }, []);
  return;
};

export default GetMyChallenge;
