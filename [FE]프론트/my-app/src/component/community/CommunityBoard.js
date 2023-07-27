import { current } from "@reduxjs/toolkit";
import { SHr,SEmpty,SEmpty2,SAdArea,SCategoryDiv,CategoryContainer,CategoryButton } from "../../styles/pages/SCommunityPage";
import React, {useEffect, useState} from 'react';
// import axios from "axios";
const categories = ["카테고리","정렬"];
const CommunityBoard = () => {
//   const [boardList, setBoardList] = useState([]);

//   const getBoardList = async () => {
//     const resp = await (await axios.get('//localhost:8080/board')).data; // 2) 게시글 목록 데이터에 할당  
//     setBoardList(resp.data); // 3) boardList 변수에 할당
//     console.log(boardList);
//   }

//   useEffect(() => {
//     getBoardList(); // 1) 게시글 목록 조회 함수 호출
//   }, []);


    // const [isOpen, setIsOpen] = useState(false);
    // const ref = useRef(null);
    // useEffect(()=>{
    //   const onClickCategory = (e) =>{
    //     if (ref.current !== null && !ref.current.contains(e.target)){
    //       //드롭다운 메뉴 외 공간을 클릭
    //       setIsOpen(!isOpen)
    //     }
    //   };

    //   if (isOpen){
    //     window.addEventListener("click",onClickCategory);
    //   }

    //   return () => {
    //     window.removeEventListener("click",onClickCategory);
    //   };
    // }, [isOpen])


    

    const [selectedCategory, setSelectedCategory] = useState('');
    const handleCategoryClick = (category) => {
      setSelectedCategory(category);
    };

  return (
    //카테고리
    <div>
    <CategoryContainer>
      {categories.map((category, index) => (
        <CategoryButton
          key={index}
          onClick={() => handleCategoryClick(category)}
          style={{
            backgroundColor: selectedCategory === category ? "rgba(80,200,50,0.8)" : "#ffffff",
          }}
        >
          {category}
        </CategoryButton>
      ))}
    </CategoryContainer>

    
    
    </div>
    
  );
};
export default CommunityBoard;
