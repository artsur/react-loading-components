import React from 'react';

function SearchBlock(props) {
  return (
    <div className='card shadow'>
      <div className='card-body'>
        <div className='form-group mb-2'>
          <label>Поиск</label>
          <input type='search' className='form-control'/>
        </div>
      </div>
    </div>

  );
}

export default SearchBlock;