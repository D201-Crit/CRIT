import React, { useState, useEffect  } from "react";
import {
  SADtextArea,
  SAdArea,
  SEmpty,
  SEmpty2,
} from "../../styles/pages/SCommunityPage";

const ads = [
  {
    title: "지금, 크릿에서 챌린지 시작하면?",
    subTitle: "푸짐한 경품이 쏟아진다!?",
    text: "당장 도전하세요!",
    backgroundColor: "#0000C5",

  },
  {
    title: "최고의 여행 패키지를 찾으세요!",
    subTitle: "휴식과 모험이 결합된 완벽한 여행!",
    text: "지금 바로 여행 계획을 세워보세요!",
    backgroundColor: "#2fd000",

  },
  {
    title: "가장 건강한 습관을 기르세요!",
    subTitle: "전문가들이 공동 개발한 건강 관리 앱!",
    text: "지금 다운로드하고 건강한 삶을 시작하세요!",
    backgroundColor: "#a30094",

  },
  {
    title: "창업 아이디어 찾기의 시작!",
    subTitle: "혁신적인 기술로 당신의 비즈니스 시작을 가속화하세요!",
    text: "지금 가입하고 사업 아이디어를 발굴해보세요!",
    backgroundColor: "#437300",

  },
  {
    title: "환경을 생각하는 지속가능한 패션!",
    subTitle: "친환경 소재와 에코 프렌들리 제품을 만나보세요!",
    text: "지금 쇼핑하고 지구를 위한 첫 걸음을 내디뎌보세요!",
    backgroundColor: "#4b29ff",

  },
];

const AdvertisingBoard = () => {
  const [currentAdIndex, setCurrentAdIndex] = useState(0);

  const handlePrevAd = () => {
    setCurrentAdIndex((prevIndex) =>
      prevIndex === 0 ? ads.length - 1 : prevIndex - 1
    );
  };

  const handleNextAd = () => {
    setCurrentAdIndex((prevIndex) => (prevIndex + 1) % ads.length);
  };

  const currentAd = ads[currentAdIndex];

  useEffect(() => {
    const timer = setTimeout(() => {
      handleNextAd();
    }, 5000); // 5초 후에 다음 광고로 넘어가기
    return () => {
      clearTimeout(timer);
    };
  }, [currentAdIndex]);

  return (
    <div>
      {/* 광고 내용 영역 */}
      <SEmpty />
      <SAdArea backgroundColor={currentAd.backgroundColor}>
        <SADtextArea >
          <h2>{currentAd.title}</h2>
          <h2>{currentAd.subTitle}</h2>
          <br />
          <p>{currentAd.text}</p>
        </SADtextArea>
        <SEmpty2 />

        {/* 광고 넘기기 버튼 영역 */}
        <div>
          <span onClick={handlePrevAd} style={{ marginRight: "0.5rem" }}>
            {"<"}
          </span>
          <span>{`${currentAdIndex + 1} | ${ads.length}`}</span>
          <span onClick={handleNextAd} style={{ marginLeft: "0.5rem" }}>
            {">"}
          </span>
        </div>
      </SAdArea>
    </div>
  );
};

export default AdvertisingBoard;
