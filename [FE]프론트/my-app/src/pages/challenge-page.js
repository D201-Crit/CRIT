// style
import {
  SCreateChallengeWrapper,
  SCreateChallengeButton,
  customModalStyles,
  SChallengeWrapper,
  SCritWrapper,
  SCrit2,
  SCritWrapper2,
} from "../styles/pages/SChallengePage";
import Loading from "../component/Loading";

// 나머지
import AOS from "aos";
import "aos/dist/aos.css";

import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import MyChallenge from "../component/challenge/MyChallenge";
import { api } from ".././api/api";
import CreateChallengeModal from "../component/challenge/CreateChallengeModal";
import SearchChallenge from "../component/challenge/SearchChallenge";
import { useDispatch, useSelector } from "react-redux";
import { setChallenge } from "../slice/ChallengeSlice";
import GetCompleteMyChallenge from "../component/challenge/GetCompleteMyChallenge";
import GetOnGoingMyChallenge from "./../component/challenge/GetOnGoingMyChallenge";
import GetAllMyChallenge from "../component/challenge/GetAllMyChallenge";
import GetPlannedMyChallenge from "../component/challenge/GetPlannedMyChallenge";
import { SCrit } from "../styles/pages/SChallengePage";
import { SStartImage } from "../styles/pages/SStartPage";
import { SScrollButtonWrapper2 } from "../styles/pages/SMainPage";

const ChallengePage = () => {
  const [loading, setLoading] = useState(true);
  const user = useSelector((state) => state.users);
  const challenges = useSelector((state) => state.challenges);
  const dispatch = useDispatch();
  // 챌린지 만들기 모달
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  // 모든 챌린지 불러오기
  const getAllChallenge = () => {
    api
      .get("https://i9d201.p.ssafy.io/api/challenge/list/all", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        dispatch(setChallenge(res.data.data));
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getAllChallenge();
  }, []);
  return (
    <SChallengeWrapper>
      {loading ? <Loading /> : null}
      <SScrollButtonWrapper2 />
      <SCreateChallengeWrapper>
        <SCreateChallengeButton onClick={openModal}>
          챌린지 만들기
        </SCreateChallengeButton>
      </SCreateChallengeWrapper>
      <SCritWrapper>
        <SCrit src="https://github.com/Jinga02/ChallengePJT/assets/110621233/5e33307d-94b5-4cd1-8a12-2f1c95f2f0ec" />
      </SCritWrapper>
      <MyChallenge />
      <SCritWrapper2>
        <SCrit2 src="https://github.com/Jinga02/ChallengePJT/assets/110621233/5e33307d-94b5-4cd1-8a12-2f1c95f2f0ec" />
      </SCritWrapper2>
      <SearchChallenge allChallenge={challenges} />
      <SStartImage
        src={process.env.PUBLIC_URL + "/startimg2.png"}
        style={{ left: "960px", top: "-750px" }}
        alt="placeholder"
      />

      {/*  모달  */}
      <Modal style={customModalStyles} isOpen={isOpen}>
        <CreateChallengeModal
          closeModal={closeModal}
          getAllChallenge={getAllChallenge}
        />
      </Modal>
      <GetAllMyChallenge />
      <GetCompleteMyChallenge />
      <GetOnGoingMyChallenge />
      <GetPlannedMyChallenge />
    </SChallengeWrapper>
  );
};

export default ChallengePage;
