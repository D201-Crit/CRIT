import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import {
  SBoardCard,
  SBoardTitle,
  SBoardCardItem,
  SBoardItemTitle,
  SHr2,
  SPrimaryButton,
} from "../../styles/pages/SCommunityPage";

const BoardCard = ({ board, imagePath }) => {
  const handleGoToDetail = () => {
    window.location.href = `/CommunityBoardPage/${board}`;
  };

  useEffect(() => {
    AOS.init({
      offset: 0,
      duration: 200,
      easing: "ease-in-out",
      once: false,
      delay: 50,
      anchorPlacement: "bottom-top",
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <div>
      <div data-aos="flip-up">
      <SBoardCardItem>
        <SBoardCard onClick={handleGoToDetail}>
          <h1>{board}</h1>

          <SBoardTitle>

          </SBoardTitle>
          <img src={process.env.PUBLIC_URL + imagePath}></img>

        {/* <SPrimaryButton className="gotodetail" onClick={handleGoToDetail}>
          게시판 입장
        </SPrimaryButton> */}
        </SBoardCard>
        </SBoardCardItem>

      
      </div>
    </div>
  );
};

export default BoardCard;
