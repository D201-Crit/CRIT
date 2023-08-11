// style
import {
  SCreateChallengeWrapper,
  SCreateChallengeButton,
  customModalStyles,
} from "../styles/pages/SChallengePage";

// 나머지
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import MyChallenge from "../component/challenge/MyChallenge";
import { api } from ".././api/api";
import CreateChallengeModal from "../component/challenge/CreateChallengeModal";
import SearchChallenge from "../component/challenge/SearchChallenge";
import { useDispatch, useSelector } from "react-redux";
import { setChallenge } from "../slice/ChallengeSlice";

const ChallengePage = () => {
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
        // .get("http://localhost:8080/challenge/list/all", {
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
    getAllChallenge();
  }, []);
  return (
    <>
      <SCreateChallengeWrapper>
        <SCreateChallengeButton onClick={openModal}>
          챌린지 만들기
        </SCreateChallengeButton>
      </SCreateChallengeWrapper>
      <MyChallenge />
      <SearchChallenge allChallenge={challenges} />
      {/*  모달  */}
      <Modal style={customModalStyles} isOpen={isOpen}>
        <CreateChallengeModal
          closeModal={closeModal}
          getAllChallenge={getAllChallenge}
        />
      </Modal>
    </>
  );
};

export default ChallengePage;
