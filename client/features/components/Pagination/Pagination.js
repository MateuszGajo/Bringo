import React from "react";
import cx from "classnames";

const Pagination = ({ currentPage, lastPage, setCurrentPage }) => {
  return (
    <nav className="pagination" role="navigation" aria-label="pagination">
      <a
        className={cx("pagination-previous", {
          isDisabled: currentPage == 1
        })}
        onClick={() => setCurrentPage(currentPage - 1)}
      >
        Poprzednia
      </a>
      <a
        className={cx("pagination-next", {
          isDisabled: currentPage == lastPage
        })}
        onClick={() => setCurrentPage(currentPage + 1)}
      >
        Następna
      </a>
      <ul className="pagination-list">
        <li>
          {currentPage > 2 ? (
            <a
              className="pagination-link"
              onClick={() => {
                setCurrentPage(1);
              }}
            >
              1
            </a>
          ) : null}
        </li>
        {currentPage >= 4 ? (
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
        ) : null}
        <li>
          {currentPage > 1 ? (
            <a
              className="pagination-link"
              onClick={() => {
                setCurrentPage(currentPage - 1);
              }}
            >
              {currentPage - 1}
            </a>
          ) : null}
        </li>
        <li>
          <a
            className="pagination-link is-current"
            onClick={() => {
              setCurrentPage(currentPage);
            }}
          >
            {currentPage}
          </a>
        </li>
        <li>
          {currentPage < lastPage ? (
            <a
              className="pagination-link"
              onClick={() => {
                setCurrentPage(currentPage + 1);
              }}
            >
              {currentPage + 1}
            </a>
          ) : null}
        </li>
        {currentPage < lastPage - 2 ? (
          <li>
            <span className="pagination-ellipsis">&hellip;</span>
          </li>
        ) : null}
        <li>
          {currentPage < lastPage - 1 ? (
            <a
              className="pagination-link"
              onClick={() => {
                setCurrentPage(lastPage);
              }}
            >
              {lastPage}
            </a>
          ) : null}
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
