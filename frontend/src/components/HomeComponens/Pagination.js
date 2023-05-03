import React from "react";
import { usePostContext } from "../../hooks/usePostContext";
import PaginationCss from "../../styles/Home/pagination.module.css";
export default function Pagination() {
  const { setPage, page, pages } = usePostContext();
  let middlePagination;
  if (pages <= 5) {
    middlePagination = [...Array(pages)].map((_, index) => {
      return (
        <button
          className={PaginationCss.numbers}
          onClick={() => {
            setPage(index + 1);
            window.scrollTo({ top: 0 });
          }}
          key={index + 1}
          disabled={index + 1 === page}
        >
          {index + 1}
        </button>
      );
    });
  } else {
    const startValue = Math.floor((page - 1) / 5) * 5;
    middlePagination = (
      <>
        {[...Array(5)].map((_, index) => {
          return (
            <button
              className={PaginationCss.numbers}
              key={startValue + index + 1}
              disabled={startValue + index + 1 === page}
              onClick={() => {
                setPage(startValue + index + 1);
                window.scrollTo({ top: 0 });
              }}
            >
              {startValue + index + 1}
            </button>
          );
        })}

        <button className={PaginationCss.numbers}>...</button>
        <button
          className={PaginationCss.numbers}
          onClick={() => {
            setPage(pages);
            window.scrollTo({ top: 0 });
          }}
        >
          {pages}
        </button>
      </>
    );
    if (page > 5) {
      if (pages - page >= 5) {
        const startValue = Math.floor((page - 1) / 5) * 5;
        middlePagination = (
          <>
            <button
              className={PaginationCss.numbers}
              onClick={() => {
                setPage(1);
                window.scrollTo({ top: 0 });
              }}
            >
              1
            </button>
            <button className={PaginationCss.numbers}>...</button>
            {[...Array(5)].map((_, index) => {
              return (
                <button
                  className={PaginationCss.numbers}
                  key={startValue + index + 1}
                  disabled={startValue + index + 1 === page}
                  onClick={() => {
                    setPage(startValue + index + 1);
                    window.scrollTo({ top: 0 });
                  }}
                >
                  {startValue + index + 1}
                </button>
              );
            })}

            <button className={PaginationCss.numbers}>...</button>
            <button
              className={PaginationCss.numbers}
              onClick={() => {
                setPage(pages);
                window.scrollTo({ top: 0 });
              }}
            >
              {pages}
            </button>
          </>
        );
      } else {
        const amountLeft = pages - page + 5;
        const startValue = Math.floor((page - 1) / 5) * 5;
        middlePagination = (
          <>
            <button
              className={PaginationCss.numbers}
              onClick={() => {
                setPage(1);
                window.scrollTo({ top: 0 });
              }}
            >
              1
            </button>
            <button className={PaginationCss.numbers}>...</button>
            {[...Array(amountLeft)].map((_, index) => {
              return (
                <button
                  style={
                    startValue + index + 1 > pages ? { display: "none" } : null
                  }
                  className={PaginationCss.numbers}
                  key={startValue + index + 1}
                  disabled={startValue + index + 1 === page}
                  onClick={() => {
                    setPage(startValue + index + 1);
                    window.scrollTo({ top: 0 });
                  }}
                >
                  {startValue + index + 1}
                </button>
              );
            })}
          </>
        );
      }
    }
  }
  return (
    pages > 1 && (
      <div className={PaginationCss.container}>
        <button
          className={PaginationCss.nextPrev}
          onClick={() => {
            setPage((prev) => prev - 1);
            window.scrollTo({ top: 0 });
          }}
          disabled={page === 1}
        >
          &#8701;{" "}
        </button>
        {middlePagination}
        <button
          className={PaginationCss.nextPrev}
          onClick={() => {
            setPage((prev) => prev + 1);
            window.scrollTo({ top: 0 });
          }}
          disabled={page === pages}
        >
          &#8702;{" "}
        </button>
      </div>
    )
  );
}
