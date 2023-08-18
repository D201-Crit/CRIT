import React, { useState, useEffect } from "react";
import { api } from "../../api/api";
import { useSelector } from "react-redux";
import {
  ProfileShortsListArea,
  ProfileShortsList,
  SisNotExist
} from "../../styles/pages/SProfilePage";
import AnotherProfileShortsItem from "./AnotherProfileShortsItem";
import { SDividerLine } from "../../styles/pages/SMainPage";
import { useParams } from "react-router-dom";

const API_BASE_URL = "https://i9d201.p.ssafy.io/api/feeds";

const AnotherProfileShorts = () => {
  const { nickname } = useParams();

  const user = useSelector((state) => state.users);
  const [shortsByAll, setShortsByAll] = useState([]);

  // 쇼츠 정보 받아오기
  const getShorts = () => {
    api
      .get("https://i9d201.p.ssafy.io/api/shorts/whole", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        setShortsByAll(res.data.data.filter((short) => short.writer === nickname));
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    getShorts();
  }, []);

  return (
    <ProfileShortsListArea>
      <h2>내가 만든 숏챌</h2>
      <SDividerLine />
      {shortsByAll && shortsByAll.length === 0 ? (
        <SisNotExist>등록된 숏챌이 없습니다</SisNotExist>
      ) : (
        <ProfileShortsList>
          <AnotherProfileShortsItem shortsByAll={shortsByAll} />
        </ProfileShortsList>
      )}
    </ProfileShortsListArea>
  );
};

export default AnotherProfileShorts;
