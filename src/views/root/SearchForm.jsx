import React from 'react';

const SearchForm = (props) => {
  function handleChange(e) {
    const value = e.target.value;
    props.handleChange(value);
  }
  function handleClick(e) {
    e.preventDefault();
    props.handleSend(props.inputValue);
    props.handleChange('');
    props.router.push({
      pathname: `/search/${props.inputValue}`,
    });
  }
  return (
    <div className="searchform">
      <input type="text" onChange={handleChange} value={props.inputValue} />
      <button onClick={handleClick}>検索</button>
    </div>
  );
};
SearchForm.propTypes = {
  router: React.PropTypes.shape({
    push: React.PropTypes.func,
  }),
  inputValue: React.PropTypes.string,
  handleSend: React.PropTypes.func,
  handleChange: React.PropTypes.func,
};

export default SearchForm;
