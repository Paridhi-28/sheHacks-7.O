// PaginationComponent.js
import { Flex } from "@chakra-ui/react";
import React from "react";
import ReactPaginate from "react-paginate";
import styles from "./Pagination.module.css";

const PaginationComponent = ({ pageCount, onPageChange }) => {
  return (

      <ReactPaginate
        activeClassName={`${styles.item} ${styles.active} `}
        breakClassName={`${styles.item} ${styles.break_me} `}
        pageLinkClassName={`${styles.linktag}`}
        breakLabel={"..."}
        containerClassName={`${styles.pagination}`}
        disabledClassName={`${styles.disabled_page}`}
        marginPagesDisplayed={2}
        nextClassName={`${styles.item} ${styles.next} `}
        // nextLabel="->"
        onPageChange={onPageChange}
        pageCount={pageCount}
        pageClassName={`${styles.item} ${styles.pagination_page}`}
        pageRangeDisplayed={2}
        previousClassName={`${styles.item} ${styles.previous}`}
        // previousLabel={<ArrowBackIosIcon style={{ fontSize: 18, width: 150 }} />}
      />

  );
};

export default PaginationComponent;
