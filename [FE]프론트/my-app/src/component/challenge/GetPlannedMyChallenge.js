import { useDispatch, useSelector } from "react-redux";
import { setPlannedMyChallenge } from "../../slice/ChallengeSlice";
import { useEffect } from "react";
import { api } from "../../api/api";

const GetPlannedMyChallenge = () => {
  const dispatch = useDispatch();
  const user = useSelector((state) => state.users);

  const PlannedMyChallenge = () => {
    api
      .get("https://i9d201.p.ssafy.io/api/challenge/list/mine/planned", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        console.log(res.data.data);
        dispatch(setPlannedMyChallenge(res.data.data));
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    PlannedMyChallenge();
  }, []);
  return;
};

export default GetPlannedMyChallenge;
