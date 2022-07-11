import React, { useState, useRef } from 'react';
import styled, { css } from 'styled-components';
import { Edit } from '../../components/Icons';
import { taiwanCityList } from './weatherApi';
import type { CityData } from './Weather';
import { useHover } from '../../hooks';

const CityNameWrapper = styled.div`
  position: relative;
  height: 24px;
  display: flex;
  justify-content: flex-end;
`;
const IconWrapper = styled.div<{ hidden: boolean }>`
  ${({ hidden }) =>
    hidden &&
    css`
      visibility: hidden;
    `}

  margin-right: 5px;
  width: 20px;
  height: 20px;
  cursor: pointer;
  & > svg {
    width: 100%;
    height: 100%;
    fill: ${({ theme }) => theme.color.lightGrey};
  }

  &:hover > svg {
    fill: ${({ theme }) => theme.color.white};
  }
`;

const MatchedCityListWrapper = styled.div`
  font-size: 0.9rem;
  padding: 5px 0px;
  background: ${({ theme }) => theme.color.black};
  width: 100%;
  position: absolute;
  top: 30px;
  max-height: 100px;
  overflow-y: auto;
  text-align: left;

  & > div {
    padding: 3px 5px;
    cursor: pointer;

    :hover {
      background: ${({ theme }) => theme.color.transparentWhite};
    }
  }
`;

const Input = styled.input`
  width: 100%;
  height: 30px;
  font-size: 1.05rem;
  position: absolute;
  color: ${({ theme }) => theme.color.white};
  background: ${({ theme }) => theme.color.transparentBlack};
  border: none;
  border-bottom: 2px solid ${({ theme }) => theme.color.white};
  padding-bottom: 5px;
  outline: none;
`;

interface WeatherLocationProps {
  cityData: CityData;
  setCityData: React.Dispatch<React.SetStateAction<CityData | null>>;
}

function WeatherLocation({ cityData, setCityData }: WeatherLocationProps) {
  const [isEditing, setIsEditing] = useState(false);
  const locationRef = useRef<HTMLDivElement>(null);
  const isLocationHover = useHover(locationRef);
  const [input, setInput] = useState('');
  const filterCityList = taiwanCityList.filter(
    (city) =>
      city.english.toLowerCase().indexOf(input.toLocaleLowerCase()) !== -1,
  );

  if (isEditing) {
    return (
      <CityNameWrapper ref={locationRef}>
        <Input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
        />
        <MatchedCityListWrapper>
          {filterCityList.map((matchedCity) => (
            <div
              key={matchedCity.english}
              onClick={() => {
                setCityData(matchedCity);
                setIsEditing(false);
              }}
              aria-hidden="true"
            >
              {matchedCity.english}
            </div>
          ))}
        </MatchedCityListWrapper>
      </CityNameWrapper>
    );
  }
  return (
    <CityNameWrapper ref={locationRef}>
      <IconWrapper
        onClick={() => {
          setIsEditing(true);
        }}
        hidden={!isLocationHover}
      >
        <Edit />
      </IconWrapper>
      <span>{cityData.english}</span>
    </CityNameWrapper>
  );
}

export default WeatherLocation;
