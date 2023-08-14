import React, { useState, useEffect } from "react";
import { SEmpty, SEmpty2 } from '../../styles/pages/SCommunityPage';
import { SWrapper } from '../../styles/SCommon';
import {  SShortsCard , SShortsContainer, SShortItem } from "../../styles/pages/SMainPage"
import { useSelector } from "react-redux";


import DetailShortModal from '../../component/shorts/DetailShortModal';

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
    <SWrapper>
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
export default ProfileMyShorts;