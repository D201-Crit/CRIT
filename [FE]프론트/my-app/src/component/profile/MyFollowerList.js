import React, { useState, useEffectm, } from "react";
import { SMyFollowingListModal, SMyFollowingListModalArea, SFollowButton } from '../../styles/pages/SProfilePage';
import { Link } from "react-router-dom";

const MyFollowerList = ({setFollowerListModal,myFollowerList}) => {
  return(
  <SMyFollowingListModal>
  <SMyFollowingListModalArea>
  <h2>팔로워 목록</h2>
  {myFollowerList && myFollowerList.map((follower) => (
    <div key={follower.id} style={{ display: 'flex', marginBottom: '10px' }}>
      <div style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '50%', overflow: 'hidden' }}>
        <img src={follower.imageUrl} alt="프로필 이미지" style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ lineHeight: '50px' }}>
      <Link to={`/ProfilePage/${follower.nickname}`} style={{ color: "#1877f2", textDecoration: "none" }}> <a>{follower.nickname}</a></Link>


      </div>
    </div>
  ))}
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <SFollowButton onClick={() => setFollowerListModal(false)}>닫기</SFollowButton>
  </div>
  </SMyFollowingListModalArea>
</SMyFollowingListModal>
)
}

export default MyFollowerList;