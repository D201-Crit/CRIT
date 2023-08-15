import React, { useState, useEffect } from "react";
import { SEmpty, SEmpty2 } from '../../../styles/pages/SCommunityPage';
import { SWrapper } from '../../../styles/SCommon';
import { SShortsContainer, SShortItem, ShortsSpanWrapper} from "../../../styles/pages/SMainPage";
import DetailShortModal from '../DetailShortModal';
import AOS from "aos";
import "aos/dist/aos.css";

const MostViewShorts = ({ shortsByView }) => {
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
    if (shortsByView) {
      const initialModalState = {};

      shortsByView.forEach((short) => {
        initialModalState[short.id] = false;
      });

      setOpenDetailModal(initialModalState);
    }
  }, [shortsByView]);

  const isAnyModalOpen = () => {
    return Object.values(openDetailModal).some((value) => value === true);
  };

  return (
    <div data-aos="fade-up">
    <SWrapper>
      <h1>조회순 숏챌</h1>
      <hr/>
      <SEmpty2 />
      <SShortsContainer>
        {shortsByView &&
          shortsByView.map((short) => (
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
      <SEmpty2 />
      <SEmpty2 />
      <SEmpty2 />


      </SShortsContainer>

      {shortsByView &&
        shortsByView.map((short) =>
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

export default MostViewShorts;