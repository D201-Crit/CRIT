import { SCommunityWrapper, SEmpty, SHr } from "../styles/pages/SCommunityPage";
import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import AdvertisingBoard from "../component/community/AdvertisingBoard ";
import CommunityBoard from "./../component/community/CommunityBoard";
// import { ChangeName, useUsername } from "./../store/CommunityStore";


const CommunityPage = () => {
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


  return (
    <div className="content" data-aos="flip-left">
      <SCommunityWrapper>
        <SEmpty />
        <div data-aos="fade-right">
        <h1>커뮤니티</h1>
        </div>
        <SHr />
        <AdvertisingBoard />
        <SEmpty />
        <div>
          <CommunityBoard />
        </div>
      </SCommunityWrapper>
    </div>
  );
};

export default CommunityPage;
