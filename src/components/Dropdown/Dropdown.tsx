import React, { useRef, useState } from 'react';
import styled from 'styled-components';
import { DropdownProps } from './types';
import { useOutsideClick } from './useOutsideClick';
import icon from './icons/Icon.svg';

export const Dropdown: React.FC<DropdownProps> = ({
  itemList,
  defaultValue,
  currentValue,
  onChange,
}) => {
  const [isShowItemList, setIsShowItemList] = useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  useOutsideClick(ref, () => setIsShowItemList(false));

  const handleBtnClk = () => {
    setIsShowItemList((prev) => !prev);
  };

  const handleItemClk = (value: string) => {
    setIsShowItemList(false);
    onChange(value);
  };

  const itemListRender = itemList.map((item, index) => (
    <Item key={index} onClick={() => handleItemClk(item)}>
      {item}
    </Item>
  ));

  const value = itemList.includes(currentValue) ? currentValue : defaultValue;

  return (
    <Wrap ref={ref}>
      <ButtonWrap>
        {/*<Icon src={icon} alt="" />*/}
        <StyledButton type={'button'} onClick={handleBtnClk}>
          {value}
        </StyledButton>
      </ButtonWrap>
      {isShowItemList ? <ItemListWrap>{itemListRender}</ItemListWrap> : null}
    </Wrap>
  );
};

const Wrap = styled.div`
  position: relative;
`;

const ButtonWrap = styled.div``;

const Item = styled.div`
  height: 44px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  text-align: left;
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;

  :hover {
    background-color: #ebf4f8;
  }
`;

const ItemListWrap = styled.div`
  width: 100%;
  position: absolute;
  margin-top: 4px;
  background: #ffffff;
  border: 1px solid #dbe2ea;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(44, 39, 56, 0.04),
    0 20px 20px rgba(44, 39, 56, 0.04);
  border-radius: 6px;
  padding: 6px 0;
`;

const StyledButton = styled.button`
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

  cursor: pointer;

  :focus {
    border: 2px solid #0880ae;
    padding: 15px;
  }

  background: #ffffff url(${icon}) no-repeat right 11px top 50%;
`;
