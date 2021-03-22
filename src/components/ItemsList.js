import React from 'react';

function ItemsList(props) {
  return (
    <div className='card shadow'>
      <div className='card-body'>
        <div className="list-group">
          <div className='list-group-item'>Какой-то пункт</div>
          <div className='list-group-item'>Какой-то пункт</div>
          <div className='list-group-item'>Какой-то пункт</div>
          <div className='list-group-item'>Какой-то пункт</div>
          <div className='list-group-item'>Какой-то пункт</div>
        </div>
      </div>
    </div>
  );
}

export default ItemsList;