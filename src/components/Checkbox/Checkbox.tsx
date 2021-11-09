import React, { useState } from 'react';
import styled, { css } from 'styled-components';
import icon from './icons/Icon.svg';
import { CheckboxProps } from './types';

export const Checkbox: React.FC<CheckboxProps> = ({
  name,
  onChange,
  value,
}) => {
  const [isFocused, setIsFocused] = useState<boolean>(false);

  return (
    <Wrap>
      <StyledLabel>
        <StyledInput
          type="checkbox"
          onChange={onChange}
          name={name}
          onFocus={() => {
            setIsFocused(true);
          }}
          onBlur={() => {
            setIsFocused(false);
          }}
        />
        <CheckboxEmulator isChecked={value} isFocused={isFocused} />
      </StyledLabel>
    </Wrap>
  );
};

const StyledInput = styled.input`
  position: absolute;
  opacity: 0;
  width: 28px;
  height: 28px;
`;

const checkboxEmulatorIsCheckedStyledOverride = css`
  border: 2px solid #0880ae;
  background-image: url(${icon});
  background-repeat: no-repeat;
`;

const CheckboxEmulator = styled.div<{ isChecked: boolean; isFocused: boolean }>`
  cursor: pointer;
  background-color: #ffffff;
  border: 1px solid #dbe2ea;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(44, 39, 56, 0.04);
  border-radius: 4px;
  width: 28px;
  height: 28px;

  ${({ isFocused }) => (isFocused ? 'border: 2px solid #0880ae;' : '')}

  ${({ isChecked }) =>
    isChecked ? checkboxEmulatorIsCheckedStyledOverride : ''}
`;

const Wrap = styled.div``;

const StyledLabel = styled.label`
  display: flex;
  width: 30px;
  height: 30px;
`;
