import styled, { createGlobalStyle } from 'styled-components';

export const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    font-family: IBM Plex Sans, sans-serif;
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    
  }
  body {
    background-color: #e5e5e5;
    min-width: 360px;
  }
`;

export const Container = styled.div`
  margin: auto auto;
  display: flex;
  justify-content: center;
  align-items: center;
  max-width: 100%;
  max-height: 100%;
  padding: 10px;
`;
