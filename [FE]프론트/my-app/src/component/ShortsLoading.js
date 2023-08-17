import React from 'react';
import {SLoadingBackground, SLoadingText} from '../styles/SCommon';

export default ({progress}) => {
  return (
    <SLoadingBackground>
      <SLoadingText>{progress}%</SLoadingText>
      <SLoadingText>잠시만 기다려 주세요</SLoadingText>
      <img src={process.env.PUBLIC_URL + '/shortchallLoad.png'} alt="placeholder" />
    </SLoadingBackground>
  );
};
