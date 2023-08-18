import React, { useState, useEffectm, } from "react";
import { SMyFollowingListModal, SModalHeader,SMyFollowingListModalArea, SFollowButton } from '../../styles/pages/SProfilePage';
import { Link } from "react-router-dom";
const MyFollowingList = ({ setFollowingListModal, myFollowingList }) => {
  return (
    <SMyFollowingListModal>
      <SMyFollowingListModalArea>
        <SModalHeader>팔로잉 목록</SModalHeader>
        {myFollowingList &&
          myFollowingList.map((following) => (
            <div
              key={following.id}
              style={{ display: "flex", marginBottom: "10px" }}
            >
              <div
                style={{
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                  borderRadius: "50%",
                  overflow: "hidden",
                }}
              >
                <img
                  src={following.imageUrl}
                  alt="프로필 이미지"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div style={{ lineHeight: "50px" }}>
                <Link
                  to={`/ProfilePage/${following.nickname}`}
                  style={{ color: "#1877f2", textDecoration: "none" }}
                >
                  {" "}
                  <a>{following.nickname}</a>
                </Link>
              </div>
            </div>
          ))}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginBottom: "20px",
          }}
        >
          <SFollowButton onClick={() => setFollowingListModal(false)}>
            닫기
          </SFollowButton>
        </div>
      </SMyFollowingListModalArea>
    </SMyFollowingListModal>
  );
};

export default MyFollowingList;
