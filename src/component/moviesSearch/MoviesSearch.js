import { useState } from 'react';
import PropTypes from 'prop-types';
import Button from '../../component/buttons/';

import s from './MoviesSearch.module.css';

const MoviesSearch = ({ onSearch, isLoading }) => {
  const [search, setSearch] = useState('');

  const handleChange = event => {
    setSearch(event.currentTarget.value.toLowerCase().trim());
  };

  const handleSubmit = event => {
    event.preventDefault();
    onSearch(search);
    reset();
  };

  const reset = () => {
    setSearch('');
  };

  return (
    <div className={s.searchForm}>
      <form onSubmit={handleSubmit}>
        <input type="text" value={search} onChange={handleChange} />
        <Button text="Search" />
      </form>
    </div>
  );
};

MoviesSearch.propTypes = {
  onSearch: PropTypes.func.isRequired,
};

export default MoviesSearch;
