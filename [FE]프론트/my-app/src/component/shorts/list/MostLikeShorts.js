import React, { useState, useEffect } from "react";
import { SEmpty, SEmpty2 } from '../../../styles/pages/SCommunityPage';
import { SWrapper } from '../../../styles/SCommon';
import { SShortsContainer, SShortItem, ShortsSpanWrapper } from "../../../styles/pages/SMainPage";
import DetailShortModal from '../DetailShortModal';
import AOS from "aos";
import "aos/dist/aos.css";

const MostLikeShorts = ({ shortsByLike }) => {
  const [openDetailModal, setOpenDetailModal] = useState({});


  useEffect(() => {
    if (shortsByLike) {
      const initialModalState = {};

      shortsByLike.forEach((short) => {
        initialModalState[short.id] = false;
      });

      setOpenDetailModal(initialModalState);
    }
  }, [shortsByLike]);

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

  const isAnyModalOpen = () => {
    return Object.values(openDetailModal).some((value) => value === true);
  };

  return (
    <div data-aos="fade-up">

    <SWrapper>
      <h1>HOT 숏챌</h1>
      <hr/>
      <SEmpty2 />
      <SShortsContainer>
        {shortsByLike &&
          shortsByLike.map((short) => (
            <SShortItem key={short.id}
            onClick={() =>
              !isAnyModalOpen() &&
              setOpenDetailModal({
                ...openDetailModal,
                [short.id]: !openDetailModal[short.id],
              })
            }
            >
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

      {shortsByLike &&
        shortsByLike.map((short) =>
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
    </SWrapper>
    </div>
  );
};

export default MostLikeShorts;