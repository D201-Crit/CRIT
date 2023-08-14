import styled from "styled-components";
const goldGradient = "linear-gradient(to right, gold, white, gold)";

// Profile Page
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
    font-size : 50px;
  }

  h2 {
    margin-top: 10px; // 추가
    color: #33FF00;
  }

  h4 {
    color: #8E8E8E;
    font-weight : 10;
  }
`;

export const Empty = styled.div`
margin-top : 30px;
`
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
  padding: 10px;
  border-radius: 50%;
  border: 5px solid gold;
  width: 200px;
  height: 200px;
  overflow: hidden;
  display: flex;
  align-items: center;
  justify-content: center;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
    border-radius: 50%;
  }
`;

export const SFeedButton = styled.span`
  text-align: center;
  width: 90px;
  height : 20px;
  padding : 15px;
  font-size: 18px;
  color : white;
  background: linear-gradient(180deg, #060DB3 0%, #FF1EB2 100%);
  border-radius: 30px;

  &:hover {
    background: linear-gradient(180deg, #060DB3 0%, #0000c5 30%, #FF1EB2 100%);
  }

  `
  
export const SFeedArea = styled.div`
  width: 100%;
  height: auto;
  padding: 30px;
  box-sizing: border-box;
  background : #2F2F2F
  

  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5px;
  }
`;

export const SFeedBox = styled.div`
  width: calc(100% / 4);
  box-sizing: border-box;
  border-radius: 70%;
  padding: 30px;
`;

export const SPost = styled.div`
  position: relative;
  img {
    width: 100%;
    aspect-ratio: 1 / 1;
    object-fit: cover;
    
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
  flex-wrap: wrap;
  justify-content: space-between;
`;

export const OpacityZero = styled.div`
  opacity: 0;
`;



export const ShortsGrid = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  background : #2F2F2F;
  width : 100%;

`;

export const SShortsArea = styled.div`
  display: flex;
  justify-content: center;
  height: 850px;
  max-height: 700px;
  padding: 30px;
  align-items: center;
  box-sizing: border-box;
  background : #2F2F2F;

  .grid-container {
    display: grid;
    grid-template-columns: repeat(4, 1fr);
    grid-gap: 5px;

  }
`;

export const ProfileShortsListArea = styled.div`
  max-width : 1200px;
  position : absolute;
  max-height: 400px;
  margin-top :50px;
  width: 1200px;
  height : 400px;
  background : #red;
`

export const ProfileShortsList = styled.div`
  padding: 15px;
  width : 800px;
  max-width : 800px;
  max-height: 400px;
`