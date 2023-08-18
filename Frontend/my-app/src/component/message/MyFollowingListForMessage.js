import React, { useState, useEffect } from "react";
import {
  SMyFollowingListModalForMessage,
  SMyFollowingListModalAreaForMessage,
  SFollowButtonForMessage,
} from "../../styles/pages/SMessage";

const MyFollowingListForMessage = ({
  setFollowingListModal,
  myFollowingList,
  onClickFollowing,
}) => {
  return (
    <SMyFollowingListModalForMessage>
      <SMyFollowingListModalAreaForMessage style={{ color: "black" }}>
        <h2>팔로잉 목록</h2>
        
        {myFollowingList &&
          myFollowingList.map((following) => (
            <div
              key={following.id}
              style={{
                display: "flex",
                marginBottom: "10px",
                cursor: "pointer",
                alignItems: "center",
              }}
              onClick={() => onClickFollowing(following.nickname)}
            >
              <div
                style={{
                  color: "black",
                  width: "50px",
                  height: "50px",
                  marginRight: "10px",
                  borderRadius: "50%",
                  overflow: "hidden",
                  border: "1px solid #dbdbdb",
                }}
              >
                <img
                  src={following.imageUrl}
                  alt="프로필 이미지"
                  style={{ width: "100%", height: "100%" }}
                />
              </div>
              <div style={{ lineHeight: "50px", color: "black" }}>
                <a style={{ color: "black" }}>{following.nickname}</a>
              </div>
            </div>
          ))}
      </SMyFollowingListModalAreaForMessage>
    </SMyFollowingListModalForMessage>
  );
};

export default MyFollowingListForMessage;
