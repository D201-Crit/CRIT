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
import { useSelector } from "react-redux";

const ChallengePage = () => {
  const user = useSelector((state) => state.users);
  const [allChallenge, setAllChallenge] = useState([]);
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
        setAllChallenge(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getAllChallenge();
  }, []);
  console.log(allChallenge);
  return (
    <>
      {/* <h1>챌린지</h1>
      <hr /> */}

      <SCreateChallengeWrapper>
        <SCreateChallengeButton onClick={openModal}>
          챌린지 만들기
        </SCreateChallengeButton>
      </SCreateChallengeWrapper>
      <MyChallenge />
      <SearchChallenge allChallenge={allChallenge} />
      {/*  모달  */}
      <Modal
        style={customModalStyles}
        isOpen={isOpen}
        onRequestClose={closeModal}
      >
        <CreateChallengeModal
          closeModal={closeModal}
          getAllChallenge={getAllChallenge}
        />
      </Modal>
    </>
  );
};

export default ChallengePage;
