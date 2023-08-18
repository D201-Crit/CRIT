// style
import {
  SCreateChallengeWrapper,
  SCreateChallengeButton,
  customModalStyles,
  SChallengeWrapper,
  SCritWrapper,
  SCrit2,
  SCritWrapper2,
  SQnAButton,
  SQnaWrapper,
  SQnajWrapper,
  SQnAButton2,
  SQnajWrapper2,
  SScrollCircle,
} from "../styles/pages/SChallengePage";
import Loading from "../component/Loading";

// 나머지
import "aos/dist/aos.css";
import React, { useEffect, useState } from "react";
import Modal from "react-modal";
import MyChallenge from "../component/challenge/MyChallenge";
import CreateChallengeModal from "../component/challenge/CreateChallengeModal";
import SearchChallenge from "../component/challenge/SearchChallenge";
import { useSelector } from "react-redux";
import GetCompleteMyChallenge from "../component/challenge/GetCompleteMyChallenge";
import GetOnGoingMyChallenge from "./../component/challenge/GetOnGoingMyChallenge";
import GetAllMyChallenge from "../component/challenge/GetAllMyChallenge";
import GetPlannedMyChallenge from "../component/challenge/GetPlannedMyChallenge";
import { SCrit } from "../styles/pages/SChallengePage";
import { SStartImage, SStartImage2 } from "../styles/pages/SStartPage";
import { SScrollButtonWrapper2 } from "../styles/pages/SMainPage";
import CheckTime from "./../component/challenge/CheckTime";
import GetAllChallenge from "./../component/challenge/GetAllChallenge";
import QnaModal from "../component/challenge/QnaModal";
import AOS from "aos";
import "aos/dist/aos.css";

const ChallengePage = () => {
  useEffect(() => {
    AOS.init({
      offset: 0,
      duration: 700,
      easing: "ease-in-out",
      once: false,
      delay: 50,
      anchorPlacement: "bottom-top",
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  const [loading, setLoading] = useState(true);
  const challenges = useSelector((state) => state.challenges);
  const checkChallenges = () => {
    if (challenges) {
      setLoading(false);
    }
  };
  // 챌린지 만들기 모달
  const [isOpen, setIsOpen] = useState(false);
  const openModal = () => {
    setIsOpen(true);
  };
  const closeModal = () => {
    setIsOpen(false);
  };

  useEffect(() => {
    checkChallenges();
  }, [challenges]);
  return (
    <div data-aos="zoom-in-up">
      <SChallengeWrapper>
        {loading ? <Loading /> : null}

        <SCreateChallengeWrapper>
          <SCreateChallengeButton onClick={openModal}>
            챌린지 만들기
          </SCreateChallengeButton>
        </SCreateChallengeWrapper>

        <SCritWrapper>
          <SCrit src="https://github.com/Jinga02/ChallengePJT/assets/110621233/5e33307d-94b5-4cd1-8a12-2f1c95f2f0ec" />
        </SCritWrapper>

        <QnaModal />
        <MyChallenge />
        <SCritWrapper2>
          <SCrit2 src="https://github.com/Jinga02/ChallengePJT/assets/110621233/5e33307d-94b5-4cd1-8a12-2f1c95f2f0ec" />
        </SCritWrapper2>
        <SearchChallenge allChallenge={challenges} />
        <SStartImage
          src={process.env.PUBLIC_URL + "/startimg2.png"}
          style={{ left: "860px", top: "-750px" }}
          alt="placeholder"
        />

        <SStartImage2
          src={process.env.PUBLIC_URL + "/backImg.png"}
          style={{ left: "0px", top: "-1200px", zIndex: "-1000" }}
          alt="placeholder"
        />

        <Modal style={customModalStyles} isOpen={isOpen}>
          <CreateChallengeModal closeModal={closeModal} />
        </Modal>

        <CheckTime />
        <GetAllChallenge />
        <GetAllMyChallenge />
        <GetCompleteMyChallenge />
        <GetOnGoingMyChallenge />
        <GetPlannedMyChallenge />
      </SChallengeWrapper>
    </div>
  );
};

export default ChallengePage;
