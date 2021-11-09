import React, { FC } from 'react';
import styled from 'styled-components';
import { ErrorMsgProps } from './types';

export const ErrorMsg: FC<ErrorMsgProps> = ({ error, showError }) => {
  return (
    <div>
      {showError ? (
        <Error>{error ? error : <>&nbsp;</>}</Error>
      ) : (
        <Error>&nbsp;</Error>
      )}
    </div>
  );
};

const Error = styled.div`
  font-style: normal;
  font-weight: normal;
  font-size: 14px;
  line-height: 18px;
  color: #ff7171;
  margin-top: 8px;
`;
