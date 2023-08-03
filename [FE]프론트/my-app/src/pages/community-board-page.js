import {
  SHr,
  SEmpty,
  SCommunityWrapper,
} from "../styles/pages/SCommunityPage";
import React from "react";
import AdvertisingBoard from "../component/community/AdvertisingBoard ";
import CommunityBoardDetail from "../component/community/CommunityBoardDetail";
import { useParams } from "react-router-dom"; // 수정

const CommunityBoardPage = () => {
  const  classification  = useParams(); // 수정
  
  // classification 변수가 객체인지 확인하여 문자열로 변환합니다.
  const classificationString = typeof classification === "object" ? classification.id : classification;

  return (
    <>
      <SCommunityWrapper>
        <SEmpty />
        <h1>커뮤니티</h1>
        <SHr />
        <AdvertisingBoard />
        <SEmpty />

        <div>
          {/* 변환된 문자열을 전달합니다. */}
          <CommunityBoardDetail classification={classificationString} />
        </div>
      </SCommunityWrapper>
    </>
  );
};

export default CommunityBoardPage;