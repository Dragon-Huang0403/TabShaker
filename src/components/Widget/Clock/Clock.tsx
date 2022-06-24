import React, { useState } from 'react';
import styled from 'styled-components';
import { useInterval } from '../../../hooks';
import TimeWrapper from './TimeWrapper';

const toTwoDigit = (num: number) => String(num).padStart(2, '0');

const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: space-between;
  gap: 5px;
`;

function Clock() {
  const [time, setTime] = useState<Date>(() => new Date());
  useInterval(() => {
    setTime(new Date());
  }, 1000);
  const hours = toTwoDigit(time.getHours());
  const mins = toTwoDigit(time.getMinutes());
  const secs = toTwoDigit(time.getSeconds());
  return (
    <Wrapper>
      <TimeWrapper time={hours} />
      <TimeWrapper time={mins} />
      <TimeWrapper time={secs} />
    </Wrapper>
  );
}

export default Clock;
