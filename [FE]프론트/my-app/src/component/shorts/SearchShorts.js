import React, { useState, useEffect } from "react";
import axios from "axios";
import { useSelector } from "react-redux";
import DetailShortModal from './DetailShortModal';
import {
  SSearchShortsWrapper,
  SInput,
  SShortItem,
  SResultList,
  SResultItem,
} from "../../styles/pages/SMainPage";
import { SShortsContainer } from '../../styles/pages/SMainPage';
const SearchShorts = () => {
  const user = useSelector((state) => state.users);
  const [searchTerm, setSearchTerm] = useState("");
  const [searchResults, setSearchResults] = useState([]);
  const [openDetailModal, setOpenDetailModal] = useState({});

  useEffect(() => {
    if (searchTerm.length > 0) {
      // 데이터를 불러오는 API 호출을 통해 실제 검색 결과를 가져옵니다.
      const fetchData = async () => {
        const response = await axios.get(
          "https://i9d201.p.ssafy.io/api/shorts/main",
          {
            headers: {
              Authorization: `Bearer ${user.accessToken}`,
            },
          }
        );
        const data = response.data.data.thumbnailsByDate;
        const results = data.filter((short) =>
          short.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSearchResults(results);
      };
      fetchData();
    } else {
      setSearchResults([]);
    }
  }, [searchTerm]);

  const handleInputChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const isAnyModalOpen = () => {
    return Object.values(openDetailModal).some((value) => value === true);
  };

  return (
    <SSearchShortsWrapper>
      <h4>갓생러들의 챌린지를 지금 바로 만나보세요!</h4>
      <h2>100,293,176개의 챌스가 등록되어있습니다.</h2>
      <SInput
        value={searchTerm}
        onChange={handleInputChange}
        placeholder="검색어를 입력하세요."
      />

      
      <SResultList>
      {/* <SResultItem> */}
      <SShortsContainer>
      {searchResults &&
        searchResults.map((result) => (
          <SShortItem key={result.id}>
            <img
                src={result.thumbnailUrl}
                alt={result.title}
                onClick={() =>
                  !isAnyModalOpen() &&
                  setOpenDetailModal({
                    ...openDetailModal,
                    [result.id]: !openDetailModal[result.id],
                  })
                }
              />
              <h2>{result.title}</h2>
              <p>{result.content}</p>
          </SShortItem>
          
        ))}
      </SShortsContainer>
      {/* </SResultItem> */}
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