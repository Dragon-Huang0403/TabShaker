import React, { useState, useRef, useEffect } from 'react';
import styled, { css } from 'styled-components';

import { taiwanCityList } from './weatherApi';
import { Edit } from '../../components/Icons';
import { useHover } from '../../hooks';

import type { CityData } from './Weather';

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
`;

const City = styled.div<{ focus: boolean }>`
  padding: 3px 5px;
  cursor: pointer;

  :hover {
    background: ${({ theme }) => theme.color.transparentWhite};
  }

  ${({ focus }) =>
    focus &&
    css`
      background: ${({ theme }) => theme.color.transparentWhite};
    `}
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
  const [currentFocusCityIndex, setCurrentFocusCityIndex] = useState(-1);
  const matchedCityRef = useRef<HTMLDivElement>(null);
  const locationRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const isLocationHover = useHover(locationRef);
  const [input, setInput] = useState('');
  const filterCityList = taiwanCityList.filter(
    (city) =>
      city.english.toLowerCase().indexOf(input.toLocaleLowerCase()) !== -1,
  );

  const handleStartEditing = () => {
    setIsEditing(true);
  };

  const handleArrowKeyDown = (e: React.KeyboardEvent) => {
    if (!matchedCityRef.current) return;
    if (e.key === 'ArrowDown') {
      setCurrentFocusCityIndex((prev) =>
        prev + 1 >= filterCityList.length ? 0 : prev + 1,
      );
    }
    if (e.key === 'ArrowUp') {
      setCurrentFocusCityIndex((prev) =>
        prev - 1 < 0 ? filterCityList.length - 1 : prev - 1,
      );
    }
    if (e.key === 'Enter' && currentFocusCityIndex !== -1) {
      setCityData(filterCityList[currentFocusCityIndex]);
      setIsEditing(false);
    }
  };

  useEffect(() => {
    if (currentFocusCityIndex === -1) return;
    (
      matchedCityRef.current?.childNodes?.[currentFocusCityIndex] as HTMLElement
    ).scrollIntoView(false);
  }, [currentFocusCityIndex]);

  useEffect(() => {
    setCurrentFocusCityIndex(-1);
  }, [filterCityList.length]);

  useEffect(() => {
    if (!isEditing) return;
    inputRef.current?.focus();
  }, [isEditing]);

  if (isEditing) {
    return (
      <CityNameWrapper ref={locationRef}>
        <Input
          type="text"
          value={input}
          onChange={(e) => {
            setInput(e.target.value);
          }}
          onKeyDown={handleArrowKeyDown}
          ref={inputRef}
        />
        <MatchedCityListWrapper ref={matchedCityRef}>
          {filterCityList.map((matchedCity, index) => (
            <City
              key={matchedCity.english}
              onClick={() => {
                setCityData(matchedCity);
                setIsEditing(false);
              }}
              aria-hidden="true"
              focus={index === currentFocusCityIndex}
            >
              {matchedCity.english}
            </City>
          ))}
        </MatchedCityListWrapper>
      </CityNameWrapper>
    );
  }
  return (
    <CityNameWrapper ref={locationRef}>
      <IconWrapper onClick={handleStartEditing} hidden={!isLocationHover}>
        <Edit />
      </IconWrapper>
      <span>{cityData.english}</span>
    </CityNameWrapper>
  );
}

export default WeatherLocation;
