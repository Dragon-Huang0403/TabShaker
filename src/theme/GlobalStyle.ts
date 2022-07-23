import { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  * {
    box-sizing: border-box;
  }

  body {
    margin: 0px;
    font-family: 'Lato', sans-serif;
    overflow: hidden;
    font-size: 1rem;
     background-color: #666;
  }

  @keyframes placeholder {
    0% {
      background-color: #666;
    }
    50% {
      background-color: #888;
    }
    100% {
      background-color: #666;
    }
  }

  @keyframes fadeIn {
    0% {
      opacity: 0%;
    }
    100% {
      opacity: 100%;
    }
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

  html {
    font-size: 20px;
  }
  
  @media (max-width: 1600px) {
    html {
      font-size: 16px;
    }
  }
`;

export default GlobalStyle;
