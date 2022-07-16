import React from 'react';
import styled from 'styled-components';
import RoundButton from './RoundButton';

const ICON_SIZE = 32;

const Link = styled.a`
  margin: auto;
`;

interface RoundLinkButtonProps {
  url: string;
  title: string;
}

function RoundLinkButton({ url, title }: RoundLinkButtonProps) {
  const domain = new URL(url).hostname;

  const iconSrc = `https://www.google.com/s2/favicons?domain=${domain}&sz=${ICON_SIZE}`;

  return (
    <RoundButton>
      <Link href={url}>
        <img src={iconSrc} alt={title} title={title} />
      </Link>
    </RoundButton>
  );
}

export default RoundLinkButton;
