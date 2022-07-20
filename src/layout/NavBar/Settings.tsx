import React from 'react';
import styled from 'styled-components';
import {
  ContentCopy,
  Github,
  Mail,
  Instagram,
  LinkedIn,
} from '../../components/Icons';
import Button from '../../components/Button/Button';

const Wrapper = styled.div`
  position: absolute;
  top: 100%;
  left: 20px;
  border-radius: 8px;
  width: 400px;
  padding: 20px 5px 15px;
  background: ${({ theme }) => theme.color.black};
  box-shadow: 0px 0px 5px 0px ${({ theme }) => theme.color.white};
  color: ${({ theme }) => theme.color.white};
`;

const Title = styled.div`
  font-size: 1.125rem;
  margin-bottom: 10px;
  font-weight: 600;
  padding-bottom: 4px;
  border-bottom: 1px solid ${({ theme }) => theme.color.lightGrey};
`;

const Section = styled.div`
  padding: 0px 15px 10px;
`;

const About = styled.div`
  font-size: 0.875rem;
  line-height: 1.25rem;
`;

const ContactIcons = styled.div`
  margin-top: 12px;
  display: flex;
  gap: 12px;
`;

const Email = styled.div`
  display: flex;
  align-items: center;
  gap: 6px;
`;

const IconWrapper = styled.div`
  width: 24px;
  height: 24px;
  cursor: pointer;

  svg {
    width: 24px;
    height: 24px;
    :hover {
      fill: ${({ theme }) => theme.color.blue};
    }
    :active {
      fill: ${({ theme }) => theme.color.blue};
      opacity: 0.9;
    }
  }
`;

const Link = styled.a`
  svg {
    transition: transform ease 0.5s;
  }
  svg:hover {
    transform: translateY(-4px);
    fill: ${({ theme }) => theme.color.blue};
  }
`;

const email = 'j0918023423@gmail.com';

function Settings() {
  const restoreSettings = () => {
    window.localStorage.clear();
    chrome?.storage?.sync?.clear();
    window.location.reload();
  };

  const copyText = () => {
    navigator.clipboard.writeText(email);
  };
  return (
    <Wrapper>
      <Section>
        <Title>Settings</Title>
        <Button onClick={restoreSettings} main text="Restore settings" />
      </Section>
      <Section>
        <Title>About</Title>
        <div>
          <About>
            <div>Dragon Huang</div>
            <Email>
              <div>Email: {email}</div>
              <IconWrapper onClick={copyText}>
                <ContentCopy />
              </IconWrapper>
            </Email>
          </About>
          <ContactIcons>
            <Link href="https://github.com/Dragon-Huang0403">
              <Github />
            </Link>
            <Link href="https://www.linkedin.com/in/xuanlong-huang-6a439a183/">
              <LinkedIn />
            </Link>
            <Link href="mailto:j0918023423@gmail.com?subject=TabShaker&body=Dear Dragon">
              <Mail />
            </Link>
            <Link href="https://www.instagram.com/dragon0403/">
              <Instagram />
            </Link>
          </ContactIcons>
        </div>
      </Section>
    </Wrapper>
  );
}

export default Settings;
