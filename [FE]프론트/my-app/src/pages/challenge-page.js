// style
import {
  SCreateChallengeWrapper,
  SCreateChallengeButton,
} from "../styles/pages/SChallengePage";

// 나머지
import React, { useState } from "react";
import Modal from "react-modal";
import MyChallenge from "../component/challenge/MyChallenge";
import ChallengeBoard from "../component/challenge/ChallengeBoard";
import CreateChallengeModal from "../component/challenge/CreateChallengeModal";
const ChallengePage = () => {
  // 챌린지 만들기 모달
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };
  const customModalStyles = {
    content: {
      backgroundColor: "rgba(22, 22, 22, 1)",
      border: "0.5px solid white",
      borderRadius: "6px",
      boxShadow: "5px 5px 20px #ff007a",
      margin: "auto",
      width: "1100px",
      height: "600px",
      padding: "20px",
      color: "black",
    },
    overlay: {
      background: "rgba(0, 0, 0, 0.5)",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      zIndex: "999",
    },
  };

  return (
    <>
      <h1>챌린지</h1>
      <hr />
      <SCreateChallengeWrapper>
        <SCreateChallengeButton onClick={openModal}>
          챌린지 만들기
        </SCreateChallengeButton>
      </SCreateChallengeWrapper>
      <MyChallenge />
      <ChallengeBoard />
      {/*  모달  */}
      <Modal
        style={customModalStyles}
        isOpen={isOpen}
        onRequestClose={closeModal}
      >
        <CreateChallengeModal closeModal={closeModal} />
      </Modal>
    </>
  );
};

export default ChallengePage;
