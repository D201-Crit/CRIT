import React, { useState, useEffect } from "react";
import { SShortsCard } from '../../../styles/pages/SMainPage';
import { SEmpty, SEmpty2 } from '../../../styles/pages/SCommunityPage';
import { SWrapper } from '../../../styles/SCommon';
import { SShortsContainer, SShortItem } from "../../../styles/pages/SMainPage";
import DetailShortModal from '../DetailShortModal';

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

  const isAnyModalOpen = () => {
    return Object.values(openDetailModal).some((value) => value === true);
  };

  return (
    <SWrapper>
      <h1>좋아요순 쇼츠</h1>
      <hr/>
      <SEmpty2 />
      <SShortsContainer>
        {shortsByLike &&
          shortsByLike.map((short) => (
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
  );
};

export default MostLikeShorts;