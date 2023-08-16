import styled, { css, keyframes } from "styled-components";
const goldGradient = "linear-gradient(to right, gold, white, gold)";

// Profile Page
const glowEffect = keyframes`
  0% {
    box-shadow: 0 0 2px rgba(255,255,255,10%)
  }
  50% {
    box-shadow: 0 0 10px rgba(255,255,255,10%), 0 0 20px rgba(255,255,255,30%);
  }
  100% {
    box-shadow: 0 0 2px rgba(255,255,255,10%);
  }
`;

const floatEffect = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(3px);
  }
  100% {
    transform: translateY(0px);
  }
`;

const glowEffect2 = keyframes`
  0% {
    box-shadow: 0 0 2px rgba(255,255,255,10%)
  }
  50% {
    box-shadow: 0 0 10px rgba(255,255,255,10%), 0 0 20px rgba(255,255,255,30%);
  }
  100% {
    box-shadow: 0 0 2px rgba(255,255,255,10%);
  }
`;

const floatEffect2 = keyframes`
  0% {
    transform: translateY(0px);
  }
  50% {
    transform: translateY(-3px);
  }
  100% {
    transform: translateY(0px);
  }
`;


export const SProfileWrapper = styled.div`
  max-width: 100%;
  height: 100%;
  padding: 30px;
  margin: auto;
  display: flex;
  flex-direction: column;
  overflow-x: hidden;
  align-items: center;
`;

export const Row = styled.div`
  justify-content: center;
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  margin: auto;
  width: 100%;
  background-color: ${(props) => props.bgColor};
`;

export const Col = styled.div`
  align-items: center;
  display: flex;
  flex-direction: column;
  flex-basis: 100%;
  flex: 1;
  margin: auto;
  background-color: ${(props) => props.bgColor};

  h1 {
    margin-top: -10px;
    font-size: 50px;
  }

  h2 {
    margin-top: 10px;
    color: #33FF00;
  }

  h4 {
    color: #8E8E8E;
    font-weight: 10;
  }
`;

export const Empty = styled.div`
  margin-top: 30px;
`;

export const SProfileImgCover = styled.div`
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  object-fit: cover;
  display: flex;
  padding: 30px;
`;

export const SProfileImg = styled.div`
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  border: 5px solid transparent;
  border-radius: 50%;
  background-image: linear-gradient(#444444, #444444), linear-gradient(to right, #FFB800, #fff, #FFB800);
  background-origin: border-box;
  background-clip: content-box, border-box;
  margin: 10px;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const SFeedButtonWrapper= styled.span`
  display: flex;
  justify-content: center;
  align-items: center;

`

export const SFeedButton2 = styled.span`
  text-align: center;
  justify-content: center;
  align-items: center;
  display: inline-block;
  width: 90px;
  height: 20px;
  padding: 15px;
  margin-bottom: 40px;
  margin-top: -80px;
  font-size: 18px;
  color: white;
  background: linear-gradient(180deg, #060DB3 0%, #FF1EB2 100%);
  border-radius: 30px;

  &:hover {
    background: linear-gradient(180deg, #060DB3 0%, #0000c5 30%, #FF1EB2 100%);
  }
`;
export const SFeedButton = styled.span`
  text-align: center;
  justify-content: center;
  align-items: center;
  display: inline-block;
  width: 90px;
  height: 20px;
  padding: 15px;
  margin-bottom: 10px;
  font-size: 18px;
  color: white;
  background: linear-gradient(180deg, #060DB3 0%, #FF1EB2 100%);
  border-radius: 30px;

  &:hover {
    background: linear-gradient(180deg, #060DB3 0%, #0000c5 30%, #FF1EB2 100%);
  }
`;

export const SFeedArea = styled.div`
  width: 100%;
  height: auto;
  margin-top : 40px;
  padding: 50px;
  box-sizing: border-box;
  /* background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.15) 0.01%, rgba(0, 0, 0, 0.01) 100%); */

  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5px;
  }
`;

export const SFeedBox = styled.div`
  max-width: calc(100% / 5 * 5);
  width: 100%;
  box-sizing: border-box;
  padding: 30px;
  
  display: grid;
  grid-template-columns: repeat(5, 1fr);
  grid-gap: 10px;
  align-items: center;
`;

export const SPost = styled.div`
  position: relative;
  cursor: pointer;
  &:hover {
    animation: ${glowEffect} 0.7s infinite alternate,
              ${floatEffect} 0.7s ease-in-out infinite;
  }
  box-sizing: border-box;
  width: 200px;
  height: 200px;
  object-fit: cover;
  border: 1px solid rgba(148, 148, 148, 0.7);
  border-radius: 30px;
  background: #161616;

  img {
    width: 100%;
    height: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    border-radius: 30px;
  }

  .modify-modal-container {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }
`;

export const FeedGrid = styled.div`
  display: flex;
  padding: 90px;
  flex-wrap: wrap;
  justify-content: center;
  background: linear-gradient(180deg, #000000 0%, rgba(0, 0, 0, 0.15) 0.01%, rgba(0, 0, 0, 0.01) 100%);
  width: 100%;
  flex-wrap: wrap;
`;

export const OpacityZero = styled.div`
  opacity: 0;
`;

export const ShortsGrid = styled.div`
  display: flex;
  flex-direction: row;
  padding: 90px;
  flex-wrap: wrap;
  justify-content: center;
  background: #2F2F2F;
  width: 100%;
`;

export const SShortsArea = styled.div`
  display: flex;
  justify-content: center;
  max-width: 960px;
  height: 600px;
  max-height: 500px;
  padding: 10px;
  align-items: center;
  box-sizing: border-box;
  background: #2F2F2F;
  padding: 30px;

  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5px;
  }
`;

export const ProfileShortsListArea = styled.div`
  position: relative;
  max-height: 600px;
  justify-content: center;
  width: 1200px;
`;

export const ProfileShortsList = styled.div`

  margin-left: 90px;
  padding: 30px;
  justify-content: center;
  max-width: 80%;
  max-height: 70%;
`;

export const SDetailFeedModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  width: 100%;
  height: 100%;
  padding: 40px;
  z-index: 100;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  
`;
export const SDetailFeedModalArea = styled.div`
  position: absolute;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  overflow-y: auto;
  width: 500px;
  height: 550px;
  max-height: 550px;
  max-width: 500px;
  top: 50%;
  left: 50%;
  margin-top: 50px;
  transform: translate(-50%, -50%);
  border-radius: 20px;
  background-color: #2F2F2F;
  padding: 60px;
  z-index: 100;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.28);
  
  img {
  margin-bottom:  -5px;
  width: 400px;
  max-width: 400px;
  max-height: 400px;
  object-fit: cover;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
  border-radius: 20px;
  border: 1px solid rgba(200, 200, 200, 0.7);
  background-color: rgba(2, 2, 2, 0.1);
  display: block;
  margin-left: auto;
  margin-right: auto;
}

  p {
    font-size: 25px;
    word-break: break-word;
    font-weight: 200;
  }
`;


export const SShortItemProfileVer = styled.div`
  background: black;
  position: relative;
  border-radius: 15px;
  max-width: 320px; // 고정 가로 길이
  max-height: 500px; // 고정 세로 길이
  display: flex;
  box-shadow: 0px 0px 20px 0.1px rgba(255, 255, 255, 15%);
  flex-direction: column;
  justify-content: flex-start;
  overflow: hidden;
  cursor: pointer;
  margin-bottom: 20px;

  img {
    width: 320px;
    height: 300px;
    /* border-radius: 15px; */
    object-fit: cover;
    opacity: 1;
  }

  h2,
  p {
    opacity: 0;
    transition: opacity 0.3s;
  }

  h2 {
    pointer-events: none;
    font-size: 25px;
    margin-top: -15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateY(-50%) translateX(-50%);
    -moz-transform: translateY(-50%) translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
  }

  p {
    pointer-events: none;
    font-size: 14px;
    margin: auto;
    margin-top: 10px;
    text-align: justify;
    color: #ff007a;
    overflow: hidden;
    text-overflow: ellipsis;
    -webkit-line-clamp: 3;
    display: -webkit-box;
    -webkit-box-orient: vertical;
    position: absolute;
    top: 50%;
    left: 50%;
    -webkit-transform: translateY(-50%) translateX(-50%);
    -moz-transform: translateY(-50%) translateX(-50%);
    transform: translateY(-50%) translateX(-50%);
  }

  &:hover {
    img {
      opacity: 0;
      transform: translate(-50%, -50%) rotate(90deg) scale(0.8);
    }

    h2,
    p {
      opacity: 1;
    }
  }
`;

export const SButtonWrapper2 = styled.div`
  display: flex;
  justify-content: center;
  position: absolute;
  width: 100%;
  bottom: 0px;
  margin-left: 45px;
  margin-bottom: -100px;
  left: 50%;
  transform: translateX(-50%);
  padding: 15px;
  gap: 10px;
`;


export const SPrimaryButton3 = styled.button`
  transform: translateX(-50%);
  background: #0000c5;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  padding: 5px 10px;
  color: white;
  border: none;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    box-shadow: 0px 0px 20px 0.1px rgba(255,255,255,15%);
    background: #0000c5;

  }
  `
export const SSecondaryButton3 = styled.button`
  transform: translateX(-50%);
  background: #ff007a;
  box-shadow: 0 2px 6px rgba(0, 0, 0, 0.1);
  font-size: 16px;
  padding: 5px 10px;
  color: white;
  border: none;
  border-radius: 5px;
  cursor: pointer;
  transition: background-color 0.3s;

  &:hover {
    box-shadow: 0px 0px 20px 0.1px rgba(255,255,255,15%);
    background: #ff007a;

  }
`;


export const SliderContainer = styled.div`
  position: relative;
  width: 1200px; // 고정 길이로 변경
  height: 370px; // 고정 길이로 변경
  overflow: hidden;
  padding: 30px;
  justify-content: center;
  margin-left: -150px;
`;


export const SProfileModifyModal = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 370px;
  height: 250px;
  z-index: 1500;
  background-color: rgba(0, 0, 0, 0.8);
  border-radius: 20px;
  display: ${({ show }) => (show ? 'block' : 'none')};
`;

export const SProfileModifyModalArea = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 0px;
`;

export const ModalText = styled.p`
  color: white;
  font-size: 18px;
  text-align: center;
  margin-bottom: 20px;
`;

export const ModalButtonContainer = styled.div`
  display: flex;
  gap: 10px;
`;

export const ModalButton = styled.button`
  padding: 8px 20px;
  border: none;
  border-radius: 5px;
  font-size: 16px;
  cursor: pointer;

  ${({ variant }) =>
    variant === 'confirm'
      ? `
      background-color: #007bff;
      color: white;
    `
      : `
      background-color: #e5e5e5;
      color: black;
    `}

  &:hover {
    opacity: 0.8;
  }
`;


