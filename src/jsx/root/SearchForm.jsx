import React from 'react';

const SearchForm = props => {
  const handleChange = (e) => {
    const value = e.target.value;
    props.handleChange(value);
  };
  const handleClick = (e) => {
    e.preventDefault();
    props.router.push({
      pathname: `/search/${props.searchValue}`,
    });
  };
  return (
    <div className="searchform">
      <input type="text" onChange={handleChange} />
      <button onClick={handleClick}>検索</button>
    </div>
  );
}

export default SearchForm;
