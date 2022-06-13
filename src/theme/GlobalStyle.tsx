import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0px;
    font-family: 'Lato', sans-serif;
  }
`;

export default GlobalStyle;
