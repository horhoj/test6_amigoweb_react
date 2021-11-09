import React from 'react';
import styled, { css } from 'styled-components';
import { ButtonProps } from './types';

export const Button: React.FC<ButtonProps> = ({ caption, disabled, type }) => {
  return (
    <div>
      <StyledButton type={type} vDisabled={disabled}>
        {caption}
      </StyledButton>
    </div>
  );
};

const styledButtonDisabledStyleOverride = css`
  background: #dbe2ea;
  box-shadow: 0 2px 4px rgba(44, 39, 56, 0.08), 0 4px 8px rgba(44, 39, 56, 0.08);
  border-radius: 6px;
  color: #b1b5bf;
  :active {
    border: none;
    opacity: 100%;
  }
`;

const StyledButton = styled.button<{ vDisabled: boolean }>`
  background: #0880ae;
  box-shadow: 0 2px 4px rgba(44, 39, 56, 0.08), 0 4px 8px rgba(44, 39, 56, 0.08);
  border-radius: 6px;
  height: 56px;
  width: 100%;
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  text-align: center;
  color: #ebf4f8;
  border: none;
  cursor: pointer;

  :active {
    border: 2px solid rgba(44, 39, 56, 0.86);
    opacity: 90%;
  }

  ${({ vDisabled }) => (vDisabled ? styledButtonDisabledStyleOverride : '')}
`;
