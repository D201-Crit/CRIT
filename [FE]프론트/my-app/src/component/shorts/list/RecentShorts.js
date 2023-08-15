import React, { useState, useEffect } from "react";
import { SEmpty, SEmpty2 } from '../../../styles/pages/SCommunityPage';
import { SWrapper } from '../../../styles/SCommon';
import { SShortsContainer, SShortItem, ShortsSpanWrapper } from "../../../styles/pages/SMainPage";
import DetailShortModal from '../DetailShortModal';
import AOS from "aos";
import "aos/dist/aos.css";

const RecentShorts = ({ shortsByDate }) => {
  const [openDetailModal, setOpenDetailModal] = useState({});
  useEffect(() => {
    AOS.init({
      offset: 0,
      duration: 600,
      easing: "ease-in-out",
      once: false,
      // delay: ,
      anchorPlacement: "bottom-top",
    });
  
    return () => {
      AOS.refresh();
    };
  }, []);

  useEffect(() => {
    if (shortsByDate) {
      const initialModalState = {};

      shortsByDate.forEach((short) => {
        initialModalState[short.id] = false;
      });

      setOpenDetailModal(initialModalState);
    }
  }, [shortsByDate]);

  const isAnyModalOpen = () => {
    return Object.values(openDetailModal).some((value) => value === true);
  };

  return (

<div data-aos="fade-up">
    <SWrapper>
      <h1>최근 숏챌</h1>
      <hr/>
      <SEmpty2 />
      <SShortsContainer>
        {shortsByDate &&
          shortsByDate.map((short) => (
            <SShortItem key={short.id}
            onClick={() =>
              !isAnyModalOpen() &&
              setOpenDetailModal({
                ...openDetailModal,
                [short.id]: !openDetailModal[short.id],
              })
            }>
              <img
                src={short.thumbnailUrl}
                alt={short.title}
                
              />
              <h2>{short.title}</h2>
              <p>♥ &nbsp; {short.likesCount}</p>
              
            <ShortsSpanWrapper>
              <span>{short.title}</span>
              <span style={{color:"gray",fontWeight:"normal"}}>{short.writer}</span>
              <span style={{color:"gray", fontWeight:"normal"}}>조회수&nbsp;{short.views}회</span>
              </ShortsSpanWrapper>
            </SShortItem>
          ))}


      </SShortsContainer>

    </SWrapper>
    {shortsByDate &&
        shortsByDate.map((short) =>
          openDetailModal[short.id] ? (
            <DetailShortModal
              key={short.id}
              shortId={short.id}
              setOpenDetailModal={() =>
                setOpenDetailModal({
                  ...openDetailModal,
                  [short.id]: false,
                })
              }
            />
          ) : null
        )}
    </div>
  );
};

export default RecentShorts;