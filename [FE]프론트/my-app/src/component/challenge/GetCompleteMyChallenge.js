import { useDispatch, useSelector } from "react-redux";
import { setCompleteMyChallenge } from "../../slice/ChallengeSlice";
import { useEffect } from "react";
import { api } from "../../api/api";

const GetCompleteMyChallenge = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);

  const completeMyChallenge = () => {
    api
      .get("https://i9d201.p.ssafy.io/api/challenge/list/finished", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        dispatch(setCompleteMyChallenge(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    completeMyChallenge();
  }, []);
  return;
};

export default GetCompleteMyChallenge;
