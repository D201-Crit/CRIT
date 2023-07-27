import {
  SHr,
  SEmpty,
  SCommunityWrapper,
} from "../styles/pages/SCommunityPage";

import React from "react";
import AdvertisingBoard from "../component/community/AdvertisingBoard ";
import CommunityBoard from "./../component/community/CommunityBoard";
import { useDispatch } from "react-redux";
// import { ChangeName, useUsername } from "./../store/CommunityStore";

const CommunityPage = () => {

  return (
    <>
      <SCommunityWrapper>
      <SEmpty />
      <h1>커뮤니티</h1>
      <SHr/>
      <AdvertisingBoard/>
      <SEmpty/>
      <div>
        <CommunityBoard />
      </div>
      </SCommunityWrapper>
    </>
  );
};

export default CommunityPage;
