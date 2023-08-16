// 외부 패키지 및 스타일 임포트
import React, { useState, useEffect } from "react";
import {
  SMyFollowingListModalForMessage,
  SMyFollowingListModalAreaForMessage,
  SFollowButtonForMessage,
} from "../../styles/pages/SMessage";

// MyFollowingListForMessage 컴포넌트 정의
const MyFollowingListForMessage = ({
  setFollowingListModal,
  myFollowingList,
  onClickFollowing,
}) => {
  return (
    // 팔로잉 목록 모달 컴포넌트 시작
    <SMyFollowingListModalForMessage>
      <SMyFollowingListModalAreaForMessage style={{ color: "black" }}>
        <h2>팔로잉 목록</h2>
        {/* 팔로잉 목록 순환하여 개별 팔로잉 정보 출력 */}
        {myFollowingList &&
          myFollowingList.map((following) => (
            // 해당 팔로잉 닉네임을 메시지 받는 사람으로 선택할 수 있는 버튼 설정
            <div
              key={following.id}
              style={{
                display: "flex",
                marginBottom: "10px",
                cursor: "pointer",
              }}
              onClick={() => onClickFollowing(following.nickname)}
            >
              {/* 프로필 이미지 출력 */}
              <div
                style={{
                  color: "black",
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
              {/* 닉네임 출력 */}
              <div style={{ lineHeight: "50px", color: "black" }}>
                <a style={{ color: "black" }}>{following.nickname}</a>
              </div>
            </div>
          ))}
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            marginTop: "20px",
          }}
        ></div>
      </SMyFollowingListModalAreaForMessage>
    </SMyFollowingListModalForMessage>
    // 팔로잉 목록 모달 컴포넌트 종료
  );
};

export default MyFollowingListForMessage;
