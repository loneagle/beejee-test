import React from 'react';

const Sort = (props) => {
  const {
    setSortField,
    setSortDirection,
  } = props;

  return (
    <div className="sort">
      <div>Sort</div>
      <select
        onChange={(e) => setSortField(e.target.value)}
      >
        <option value="username">username</option>
        <option value="email">email</option>
        <option value="text">text</option>
        <option value="status">status</option>
      </select>
      <select
        onChange={(e) => setSortDirection(e.target.value)}
      >
        <option value="desc">Desc</option>
        <option value="asc">Asc</option>
      </select>
    </div>
  );
};

export default Sort;
