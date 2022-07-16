import React from 'react';
import styled from 'styled-components';
import RoundButton from './RoundButton';
import { getDomain } from '../../utils/lib';

const ICON_SIZE = 32;

const Img = styled.img`
  display: inline-block;
  width: ${ICON_SIZE}px;
  height: ${ICON_SIZE}px;
`;

interface RoundLinkButtonProps {
  url: string;
  title: string;
}

function RoundLinkButton({ url, title }: RoundLinkButtonProps) {
  const domain = getDomain(url);

  const iconSrc = `https://www.google.com/s2/favicons?domain=${domain}&sz=${ICON_SIZE}`;

  const onClick = () => {
    window.location.href = url;
  };

  return (
    <RoundButton onClick={onClick}>
      <Img src={iconSrc} alt={title} title={title} />
    </RoundButton>
  );
}

export default RoundLinkButton;
