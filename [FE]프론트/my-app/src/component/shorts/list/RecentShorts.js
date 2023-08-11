import React, { useState, useEffect } from "react";
import { SShortsCard } from '../../../styles/pages/SMainPage';
import { SEmpty, SEmpty2 } from '../../../styles/pages/SCommunityPage';
import { SWrapper } from '../../../styles/SCommon';
import { SShortsContainer, SShortItem } from "../../../styles/pages/SMainPage";
import DetailShortModal from '../DetailShortModal';

const RecentShorts = ({ shortsByDate }) => {
  const [openDetailModal, setOpenDetailModal] = useState({});

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
    <SWrapper>
      <h1>최근 쇼츠</h1>
      <hr/>
      <SEmpty2 />
      <SShortsContainer>
        {shortsByDate &&
          shortsByDate.map((short) => (
            <SShortItem key={short.id}>
              <img
                src={short.thumbnailUrl}
                alt={short.title}
                onClick={() =>
                  !isAnyModalOpen() &&
                  setOpenDetailModal({
                    ...openDetailModal,
                    [short.id]: !openDetailModal[short.id],
                  })
                }
              />
              <h2>{short.title}</h2>
              <p>♥ &nbsp; {short.likesCount}</p>
              
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
    </SWrapper>
  );
};

export default RecentShorts;