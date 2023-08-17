import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import DetailShortModal from './DetailShortModal';
import {
  SSearchShortsWrapper,
  SInput,
  SShortItem,
  SResultList,
  SResultContainer,
  SResultItem,
  ShortsSpanWrapper
} from "../../styles/pages/SMainPage";
import { SEmpty2 } from '../../styles/SCommon';
import {SLogoImage} from '../../styles/pages/SStartPage'



const SearchShorts = ({shortsByAll}) => {

  const shortLength = shortsByAll.length
  const user = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openDetailModal, setOpenDetailModal] = useState({});

  const performSearch = async () => {
    if (searchTerm.length > 0) {
      const response = await axios.get(
        "https://i9d201.p.ssafy.io/api/shorts/whole",
        {
          headers: {
            Authorization: `Bearer ${user.accessToken}`,
          },
        }
      );
      const data = response.data.data;
      const results = data.filter((short) =>
        short.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  };

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  };

  const isAnyModalOpen = () => {
    return Object.values(openDetailModal).some((value) => value === true);
  };

  return (
    <SSearchShortsWrapper>
            <SLogoImage src={process.env.PUBLIC_URL + "/logo.png"} alt="placeholder" />
            <SEmpty2/>

      <h1 style={{color:"gray", fontWeight:"normal"}}> {shortLength}개의 숏챌이 등록되어있습니다.</h1>
      <SEmpty2/>
      <SInput
        value={searchTerm}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
        placeholder="검색어를 입력하세요."
      />

      
      <SResultList>
      <SResultContainer>
      {searchResults &&
        searchResults.map((result) => (
          <SResultItem onClick={() =>
            !isAnyModalOpen() &&
            setOpenDetailModal({
              ...openDetailModal,
              [result.id]: !openDetailModal[result.id],
            })
          }key={result.id}>
            <img
                src={result.thumbnailUrl}
                alt={result.title}
                
              />
              <h2>{result.title}</h2>
              <p>♥ &nbsp; {result.likesCount}</p>
              <ShortsSpanWrapper>
              <span>{result.title}</span>
              <span style={{color:"gray",fontWeight:"normal"}}>{result.writer}</span>
              <span style={{color:"gray", fontWeight:"normal"}}>조회수&nbsp;{result.views}회</span>
              </ShortsSpanWrapper>
          </SResultItem>
          
        ))}
      </SResultContainer>
      </SResultList>
        {searchResults &&
        searchResults.map((result) =>
          openDetailModal[result.id] ? (
            <DetailShortModal
              key={result.id}
              shortId={result.id}
              setOpenDetailModal={() =>
                setOpenDetailModal({
                  ...openDetailModal,
                  [result.id]: false,
                })
              }
            />
          ) : null
        )}
    </SSearchShortsWrapper>
  );
};

export default SearchShorts;
