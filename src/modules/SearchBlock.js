import React from 'react';

function SearchBlock(props) {
  return (
    <div className='form-group'>
      <label>Поиск</label>
      <input type='search' className='form-control'/>
    </div>
  );
}

export default SearchBlock;