import { styled } from "styled-components";

export const SEntranceButtonWrapper = styled.div`
  width: 100%;
  height: 100px;
`;
export const SEntranceButton = styled.button`
  position: relative;
  left: 75%;
  background-color: #0000c5;
  border: none;
  border-radius: 6px;
  margin: 25px;
  width: 150px;
  height: 50px;
  font-weight: bold;
  font-size: 18px;
  color: white;
  cursor: pointer;
`;
export const SEntranceUl = styled.ul`
  position: relative;
  background-color: rgba(22, 22, 22, 0.599);
  width: 400px;
  left: 72%;
  padding: 0;
`;
export const SEntranceLi = styled.li`
  ${"" /* background-color: red; */}
  display: flex;
  width: 100%;
  height: 100px;
  list-style: none;
  border-radius: 8px;
  padding: 8px;
  margin: 5px 0;
  p {
    position: relative;
    top: -10px;
    right: 40px;
  }
  h4 {
    position: relative;
    top: 77px;
    right: 73px;
    margin: 0;
  }
  img {
    margin: 5px;
    height: 70%;
  }
`;
export const SEntranceLiButton = styled.button`
  position: relative;
  top: 50px;
  left: 20px;
  width: 25%;
  height: 40%;
  background-color: #33ff00;
  border: none;
  border-radius: 6px;
  font-weight: 800;
  cursor: pointer;
`;
// 챌스 검색
export const SSearchShortsWrapper = styled.div`
  text-align: center;
`;
export const SInput = styled.input`
  background-color: rgba(22, 22, 22, 0.599);
  color: white;
  width: 50%;
  border: none;
  border-radius: 5px;
  font-size: 18px;
  padding: 13px;
  margin: 0 auto;
  display: block;

  & + hr {
    width: 50%;
    border: none;
    height: 0.5px;
    background-color: #ccc;
    margin: 30px auto;
  }
`;
