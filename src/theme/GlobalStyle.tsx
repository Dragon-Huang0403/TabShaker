import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  html {
    background: black;
  }

  body {
    margin: 0px;
    font-family: 'Lato', sans-serif;
    overflow: hidden;
  }

  a, a:visited, a:hover, a:active {
    color: inherit;
    text-decoration: none;
  }

  *::-webkit-scrollbar {
    overflow: visible;
    width: 13px;
    height: 13px;
  }

  *::-webkit-scrollbar-thumb {
    background-clip: padding-box;
    border: 3px solid transparent;
    border-radius: 7px;
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

export default GlobalStyle;
