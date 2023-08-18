import React, { useState, useEffect } from "react";
import { SEmpty, SEmpty2 } from '../../styles/pages/SCommunityPage';
import { SWrapper } from '../../styles/SCommon';
import {  ShortsSpanWrapper, SShortsCard , SShortsContainer, SShortItem } from "../../styles/pages/SMainPage"
import { useSelector } from "react-redux";


import DetailShortModal from '../shorts/DetailShortModal';

const ProfileMyShorts = ({ shortsByDate }) => {
  const [openDetailModal, setOpenDetailModal] = useState({});
  const user = useSelector((state) => state.users);

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
    <div>
      <SShortsContainer>
        {shortsByDate &&
          shortsByDate
          .filter((short) => short.writer === user.nickname)
          .map((short) => (
            <SShortItem key={short.id}
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
export default ProfileMyShorts;