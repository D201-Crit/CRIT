import React from 'react';
import Pagination from 'react-js-pagination';
import styles from './Paging.module.css';

const Paging = ({activePage, totalItemsCount, onChange}) => {
  return (
    <div className={styles.paginationContainer}>
      <Pagination
        itemClass={'page-item'}
        linkClass={'page-link'}
        activeLinkClass={styles.active}
        activePage={activePage}
        itemsCountPerPage={10} // 한 페이지에 보여줄 아이템의 개수입니다. 이에 맞게 조정해 주세요.
        totalItemsCount={totalItemsCount}
        pageRangeDisplayed={5}
        prevPageText={"‹"}
        nextPageText={"›"}
        innerClass={styles.pagination}
        onChange={onChange}
      />
    </div>
  );
};

export default Paging;
