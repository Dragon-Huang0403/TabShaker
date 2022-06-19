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
  }

  a, a:visited, a:hover, a:active {
    color: inherit;
    text-decoration: none;
  }
`;

export default GlobalStyle;
