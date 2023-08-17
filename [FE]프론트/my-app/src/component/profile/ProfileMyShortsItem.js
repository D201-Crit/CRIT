import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useEffect } from "react";
import { SShortItemProfileVer, SisNotExist,ProfileShortsListArea,SliderContainer, SliderItem } from '../../styles/pages/SProfilePage';
import { SEmpty, SEmpty2 } from '../../styles/pages/SCommunityPage';
import { SWrapper } from '../../styles/SCommon';
import { SShortsCard, ShortsSpanWrapper, SShortsContainer, SShortItem } from "../../styles/pages/SMainPage";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import DetailShortModal from '../shorts/DetailShortModal';

const ProfileMyShortsItem = ({ shortsByAll }) => {
  const [openDetailModal, setOpenDetailModal] = useState({});
  const user = useSelector((state) => state.users);

  useEffect(() => {
    if (shortsByAll) {
      const initialModalState = {};
      shortsByAll.forEach((short) => {
        initialModalState[short.id] = false;
      });

      setOpenDetailModal(initialModalState);
    }
  }, [shortsByAll]);

  const isAnyModalOpen = () => {
    return Object.values(openDetailModal).some((value) => value === true);
  };

  const slideLength = shortsByAll && shortsByAll.filter((short) => short.writer === user.nickname).length;
  const settings = {
    dots: slideLength > 1,
    infinite: slideLength > 1,
    slidesToShow: slideLength >= 4 ? 4 : slideLength,
    slidesToScroll: slideLength >= 4 ? 4 : slideLength,
    draggable: !isAnyModalOpen(),
  };

  return (
    <div>
      {shortsByAll ? (
        <div>
          {slideLength > 0 ? (
            <div>
              <SliderContainer>
                <Slider {...settings}>
                  {shortsByAll
                    .filter((short) => short.writer === user.nickname)
                    .map((short) => (
                      <SShortItemProfileVer
                        onClick={() =>
                          !isAnyModalOpen() &&
                          setOpenDetailModal({
                            ...openDetailModal,
                            [short.id]: !openDetailModal[short.id],
                          })
                        }
                        key={short.id}
                      >
                        <img src={short.thumbnailUrl} alt={short.title} />
                        <h2>{short.title}</h2>
                        <p>♥ &nbsp; {short.likesCount}</p>
                        <ShortsSpanWrapper>
                          <span>{short.title}</span>
                          <span style={{ color: "gray", fontWeight: "normal" }}>{short.writer}</span>
                          <span style={{ color: "gray", fontWeight: "normal" }}>
                            조회수&nbsp;{short.views}회
                          </span>
                        </ShortsSpanWrapper>
                      </SShortItemProfileVer>
                    ))}
                </Slider>
              </SliderContainer>
            </div>
          ) : (
            <ProfileShortsListArea>
              <SEmpty2/>
              <h2 style={{fontSize: "30px",color : "#343CF4"
            }}>등록된 숏챌이 없습니다</h2>
            <SEmpty2/>

            </ProfileShortsListArea>        )}
        </div>
      ) : null}

      {shortsByAll &&
        shortsByAll.map((short) =>
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
export default ProfileMyShortsItem;
