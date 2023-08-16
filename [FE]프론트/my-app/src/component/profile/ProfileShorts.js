import React, { useState, useEffect } from "react";
import { api } from '../../api/api';
import { useSelector } from "react-redux";
import { ProfileShortsListArea, ProfileShortsList } from "../../styles/pages/SProfilePage";
import ProfileMyShorts from "./ProfileMyShorts";
import { SDividerLine } from '../../styles/pages/SMainPage';
const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/feeds';

const ProfileShorts = () => {
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
        setShortsByAll(res.data.data);
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
        <h2>내가 만든 쇼츠</h2>
        <SDividerLine/>
        <ProfileShortsList>
          <ProfileMyShorts shortsByAll={shortsByAll}/>
        </ProfileShortsList>
      </ProfileShortsListArea>   
    );
  };


export default ProfileShorts;
