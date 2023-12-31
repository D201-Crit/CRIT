import React, { useEffect } from "react";
import AOS from "aos";
import "aos/dist/aos.css";
import { SEmpty } from "../styles/pages/SCommunityPage";

import { SIntroPageWrapper } from "../styles/pages/SIntroPage";
import CheckTime from "./../component/challenge/CheckTime";

const IntroPage = () => {
  const user_image =
    "https://github.com/Jinga02/Review/assets/110621233/e8edd4c4-dd18-42d8-904c-4a04c6618018";

  useEffect(() => {
    AOS.init({
      offset: 0,
      duration: 300,
      easing: "ease-in-out",
      once: false,
      delay: 50,
      anchorPlacement: "top-bottom",
    });

    return () => {
      AOS.refresh();
    };
  }, []);

  return (
    <SIntroPageWrapper>
      <SEmpty />
      <div
        className="content"
        data-aos="fade-up"
        style={{ "margin-top": "200px" }}
      >
        <img
          src={process.env.PUBLIC_URL + "/logo2.png"}
          style={{ width: "700px", height: "350px" }}
          alt="placeholder"
        />

        <div className="intro-text">
          <h1>
            누구나 볼 수 있는 성취의 순간,
            <br />
            <span style={{ color: "#33ff00" }}>크릿</span>을 만나보세요!
          </h1>
          <p style={{ color: "grey" }}>
            챌린지를 즐겁게 시작하고 이끌어가는 서비스, 크릿! 다양한 도전을
            경험하고,
            <br />
            성장 과정을 기록하며, 영상을 통해 소통하는 신개념 챌린지
            플랫폼입니다.
          </p>
        </div>
      </div>

      <SEmpty />
      <SEmpty />

      <div className="content empty" data-aos="fade-up" data-aos-delay="150">
        <img
          src={process.env.PUBLIC_URL + "/introimg1.png"}
          style={{ width: "700px", height: "700px" }}
          alt="placeholder"
        />
        <div className="intro-text">
          <h1>
            함께 성장하는 <br />
            챌린지 커뮤니티
          </h1>
          <p style={{ color: "grey" }}>
            크릿에서는 서로를 응원하고 도전을 공유하는 실시간 소셜 기능을 갖춰
            챌린지
            <br />
            참여자들이 소리내어 함께 성장할 수 있는 플랫폼을 제공합니다.
          </p>
        </div>
      </div>
      <SEmpty />
      <div className="content empty" data-aos="fade-up" data-aos-delay="150">
        <div className="intro-text">
          <h1>영상으로 즐기는 챌린지 이야기</h1>
          <p style={{ color: "grey" }}>
            크릿에서 숏챌(숏폼 동영상)을 통해 참여자들의 도전 이야기를 공유하며,
            도전하고 함께
            <br />
            성장하는 즐거움을 누리세요. 새로운 영상 컨텐츠로 소중한 추억을
            간직해보세요.
          </p>
          <img src={process.env.PUBLIC_URL + "/introimg2.png"} 
                    style={{ width: "900px", height: "700px" }}

          alt="placeholder" />
        </div>
      </div>


      <SEmpty />

      <div className="content empty" data-aos="fade-down" data-aos-delay="150">

        <img src={process.env.PUBLIC_URL + "/board3.png"} 
                  style={{ width: "700px", height: "700px" }}

        alt="placeholder" />
        <div className="intro-text">
          <h1>다양한 도전과 만남이 기다립니다!</h1>
          <p style={{ color: "grey" }}>
            크릿에서 개성 넘치는 참여자들과 다양한 챌린지에 도전하며, 새로운
            경험과 만남을
            <br />
            만끽하세요. 함께 웃고, 함께 성장하며, 뜻깊은 도전을 이어가 보세요.
          </p>
        </div>
      </div>
      <CheckTime />
    </SIntroPageWrapper>
  );
};

export default IntroPage;
