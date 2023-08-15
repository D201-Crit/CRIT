import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useEffect } from "react";
import { SShortItemProfileVer } from '../../styles/pages/SProfilePage';
import { SEmpty, SEmpty2 } from '../../styles/pages/SCommunityPage';
import { SWrapper } from '../../styles/SCommon';
import { SShortsCard, ShortsSpanWrapper, SShortsContainer, SShortItem } from "../../styles/pages/SMainPage";
import { useSelector } from "react-redux";
import Slider from "react-slick";
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

  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 4,
    slidesToScroll: 4,
    draggable: !isAnyModalOpen(),
  };

  return (
    <div>
      {shortsByDate && (
        <div>
          <Slider {...settings}>
            {shortsByDate
              .filter((short) => short.writer === user.nickname)
              .map((short) => (
                <SShortItemProfileVer  onClick={() =>
                  !isAnyModalOpen() &&
                  setOpenDetailModal({
                    ...openDetailModal,
                    [short.id]: !openDetailModal[short.id],
                  })
                }key={short.id}>
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
                </SShortItemProfileVer>
              ))}
          </Slider>
        </div>
      )}

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
