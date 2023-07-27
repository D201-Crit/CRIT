import { SSearchShortsWrapper, SInput } from "../../styles/pages/SMainPage";

const SearchShorts = () => {
  return (
    <SSearchShortsWrapper>
      <h4>갓생러들의 챌린지를 지금 바로 만나보세요!</h4>
      <h2>100,293,176개의 챌스가 등록되어있습니다.</h2>
      <SInput placeholder="검색어를 입력하세요." />
    </SSearchShortsWrapper>
  );
};

export default SearchShorts;
