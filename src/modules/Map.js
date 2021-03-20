import React from 'react';
import styled from 'styled-components';

const Map = styled.div`
  width: 100%;
  height: 500px;

  display: flex;
  justify-content: center;
  align-items: center;

  border: 2px dotted #798ca5;
  

  ${props => props.css}
`;

export default () => (
  <Map>Здесь будет карта</Map>
);