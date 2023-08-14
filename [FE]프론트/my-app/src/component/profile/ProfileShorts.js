import React, { useState, useEffect } from "react";
import "./FeedCreateModal.css";
import { api } from '../../api/api';
import { useSelector } from "react-redux";
import { ProfileShortsListArea, ProfileShortsList } from "../../styles/pages/SProfilePage";
import ProfileMyShorts from "./ProfileMyShorts";
const API_BASE_URL = 'https://i9d201.p.ssafy.io/api/feeds';

const ProfileShorts = () => {
  const user = useSelector((state) => state.users);
  const [shortsByDate, setShortsByDate] = useState([]);

  // 쇼츠 정보 받아오기
  const getShorts = () => {
    api
      .get("https://i9d201.p.ssafy.io/api/shorts/main", {
        headers: {
          Authorization: `Bearer ${user.accessToken}`,
        },
      })
      .then((res) => {
        console.log("쇼츠데이터", res.data.data);
        setShortsByDate(res.data.data.thumbnailsByDate);
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
        <h2 style={{margin:"5px"}}>내가 만든 쇼츠</h2>
        <ProfileShortsList>
          <ProfileMyShorts shortsByDate={shortsByDate}/>
        </ProfileShortsList>
      </ProfileShortsListArea>   
    );
  };


export default ProfileShorts;
