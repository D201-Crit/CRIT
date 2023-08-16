import React, { useState, useEffectm, } from "react";
import { SMyFollowingListModal, SMyFollowingListModalArea, SFollowButton } from '../../styles/pages/SProfilePage';

const MyFollowingList = ({setFollowingListModal,myFollowingList}) => {
  return(
  <SMyFollowingListModal>
  <SMyFollowingListModalArea>
  <h2>팔로잉 목록</h2>
  {myFollowingList && myFollowingList.map((following) => (
    <div key={following.id} style={{ display: 'flex', marginBottom: '10px' }}>
      <div style={{ width: '50px', height: '50px', marginRight: '10px', borderRadius: '50%', overflow: 'hidden' }}>
        <img src={following.imageUrl} alt="프로필 이미지" style={{ width: '100%', height: '100%' }} />
      </div>
      <div style={{ lineHeight: '50px' }}>
        <a>{following.nickname}</a>
      </div>
    </div>
  ))}
  <div style={{ display: 'flex', justifyContent: 'center', marginTop: '20px' }}>
    <SFollowButton onClick={() => setFollowingListModal(false)}>닫기</SFollowButton>
  </div>
  </SMyFollowingListModalArea>
</SMyFollowingListModal>
)
}

export default MyFollowingList;