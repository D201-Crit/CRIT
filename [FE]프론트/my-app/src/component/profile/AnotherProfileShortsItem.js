import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import React, { useState, useEffect } from "react";
import { SShortItemProfileVer, SliderContainer } from '../../styles/pages/SProfilePage';
import { ShortsSpanWrapper, } from "../../styles/pages/SMainPage";
import { useSelector } from "react-redux";
import Slider from "react-slick";
import DetailShortModal from '../shorts/DetailShortModal';
import { useParams } from 'react-router-dom';

const AnotherProfileShortsItem = ({ shortsByAll }) => {
  const { nickname } = useParams();
  console.log(nickname)
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



const slideLength = shortsByAll && shortsByAll.filter((short) => short.writer === nickname).length;
console.log("매끼고",slideLength)
const settings = {
  dots: slideLength > 1,
  infinite: slideLength > 1,
  slidesToShow: slideLength >= 4 ? 4 : slideLength,
  slidesToScroll: slideLength >= 4 ? 4 : slideLength,
  draggable: !isAnyModalOpen(),
};



  return (
    <div>
      {shortsByAll && (
        <div>
            <SliderContainer>

          <Slider {...settings}>
            {shortsByAll
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
          </SliderContainer>

        </div>
        
      )}

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
export default AnotherProfileShortsItem;
