import React from 'react';
import styled from 'styled-components';
import Resizers from './Resizers';

const Wrapper = styled.div`
  position: relative;
  width: 300px;
  height: 300px;
`;

function WidgetContainer() {
  return (
    <Wrapper>
      <Resizers defaultHeight={300} defaultWidth={300} />
    </Wrapper>
  );
}

export default WidgetContainer;
