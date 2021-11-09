import React from 'react';
import styled from 'styled-components';
import { InputProps } from './types';

export const Input: React.FC<InputProps> = ({
  value,
  onChange,
  label,
  placeholder,
  error,
  showError,
  name,
  onBlur,
  type,
}) => {
  return (
    <Wrap>
      <div>
        <Label>{label}</Label>
      </div>
      <div>
        <StyledInput
          type={type}
          value={value}
          onChange={onChange}
          placeholder={placeholder}
          name={name}
          onBlur={onBlur}
        />
      </div>
      <div>
        {showError ? (
          <Error>{error ? error : <>&nbsp;</>}</Error>
        ) : (
          <Error>&nbsp;</Error>
        )}
      </div>
    </Wrap>
  );
};

const StyledInput = styled.input`
  background: #ffffff;
  border: 1px solid #dbe2ea;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(44, 39, 56, 0.04);
  border-radius: 6px;
  padding: 16px;
  outline: none;
  width: 100%;

  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  letter-spacing: 0;
  text-align: left;

  margin-top: 7px;

  :focus {
    border: 2px solid #0880ae;
    padding: 15px;
  }
  ::placeholder {
    color: #7c9cbf;
  }
`;

const Wrap = styled.div``;

const Label = styled.label`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: #756f86;
`;

const Error = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #ff7171;
  margin-top: 8px;
`;
