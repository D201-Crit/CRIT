import {
  SADtextArea,
  SAdArea,
  SEmpty,
  SEmpty2,
} from "../../styles/pages/SCommunityPage";

import React from "react";
const AdvertisingBoard = () => {
  return (
    <div>
      <SEmpty />
      <SAdArea>
        <SADtextArea>
          <h2>지금, 크릿에서 챌린지 시작하면?</h2>
          <h2>푸짐한 경품이 쏟아진다!?</h2>
          <br />
          <p>당장 도전하세요!</p>
        </SADtextArea>
        <SEmpty2 />
        <p>{`< 01 | 05 >`}</p>
      </SAdArea>
    </div>
  );
};

export default AdvertisingBoard;
