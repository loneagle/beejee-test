import React from 'react';

const Pagination = (props) => {
  const {
    length,
    page,
    setPage,
  } = props;

  if (length < 3) return null;

  return (
    <div className="pagination">
      <button
        onClick={()=> setPage(page - 1)}
        disabled={page === 1}
      >
        Previous
      </button>
      <div>Current {page}</div>
      <button
        onClick={()=> setPage(page + 1)}
        disabled={page * 3 >= length}
      >
        Next
      </button>
    </div>
  );
};

export default Pagination;
