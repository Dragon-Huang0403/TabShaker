import React from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  background: ${({ theme }) => theme.color.black};
  width: 100%;
  height: 100%;
`;

function Calendar() {
  return <Wrapper>Calendar</Wrapper>;
}

export default Calendar;
