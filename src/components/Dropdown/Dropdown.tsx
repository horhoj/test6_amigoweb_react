import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { DropdownProps } from './types';
import { useOutsideClick } from './useOutsideClick';
import icon from './icons/Icon.svg';

export const Dropdown: React.FC<DropdownProps> = ({
  itemList,
  defaultValue,
  currentValue,
  onChange,
  label,
  placeholder,
  onBlur,
  name,
}) => {
  const [isShowItemList, setIsShowItemList] = useState<boolean>(false);

  const [selectedItemId, setSelectedItemId] = useState<number>(0);

  const [isEnterOrTabKeyPressed, setIsEnterOrTabKeyPressed] =
    useState<boolean>(false);

  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isEnterOrTabKeyPressed) {
      onChange(itemList[selectedItemId]);
      setIsEnterOrTabKeyPressed(false);
    }
  }, [isEnterOrTabKeyPressed]);

  useOutsideClick(ref, () => setIsShowItemList(false));

  useEffect(() => {
    //обработка нажатий клавиш
    const handleKeyDown = (e: KeyboardEvent) => {
      e.preventDefault();
      //захлопываем по escape
      if (e.key === 'Escape') {
        setIsShowItemList(false);
      }
      // захлопываем по Enter или Tab
      // и меняем значение
      if (e.key === 'Enter' || e.key === 'Tab') {
        setIsEnterOrTabKeyPressed(true);
        setIsShowItemList(false);
      }
      if (e.key === 'ArrowUp') {
        setSelectedItemId((prev) => {
          if (prev === 0) {
            return 0;
          }
          return prev - 1;
        });
      }
      if (e.key === 'ArrowDown') {
        setSelectedItemId((prev) => {
          if (prev === itemList.length - 1) {
            return prev;
          }
          return prev + 1;
        });
      }
    };

    //вешаем обработчик при открытии списка
    if (isShowItemList) {
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      //убираем обработчик при закрытии списка
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isShowItemList]);

  const handleBtnClk = () => {
    setIsShowItemList((prev) => !prev);
    const currentItemIndex = itemList.findIndex((item) => item === value);
    if (currentItemIndex >= 0) {
      setSelectedItemId(currentItemIndex);
    }
  };

  const handleItemClk = (value: string) => {
    setIsShowItemList(false);
    onChange(value);
  };

  const itemListRender = itemList.map((item, index) => (
    <Item
      key={index}
      onClick={() => handleItemClk(item)}
      isSelected={selectedItemId === index}
    >
      {item}
    </Item>
  ));

  const value = itemList.includes(currentValue) ? currentValue : defaultValue;

  return (
    <Wrap ref={ref}>
      <div>
        <Label>{label}</Label>
      </div>
      <ButtonWrap>
        <StyledButton
          type={'button'}
          onClick={handleBtnClk}
          isPlaceholderTextStyle={!value}
          onBlur={onBlur}
          name={name}
        >
          {value ? value : placeholder}
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

const Item = styled.button<{ isSelected: boolean }>`
  height: 44px;
  font-size: 16px;
  font-style: normal;
  font-weight: 400;
  line-height: 21px;
  text-align: left;
  display: flex;
  width: 100%;
  border: none;

  justify-content: start;
  align-items: center;
  padding: 0 15px;
  cursor: pointer;

  background-color: ${({ isSelected }) => (isSelected ? '#ebf4f8' : '#fff')};

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

const StyledButton = styled.button<{ isPlaceholderTextStyle: boolean }>`
  border: 1px solid #dbe2ea;
  box-sizing: border-box;
  box-shadow: 0 4px 8px rgba(44, 39, 56, 0.04);
  border-radius: 6px;
  padding: 16px;
  outline: none;
  width: 100%;
  height: 52px;

  ${({ isPlaceholderTextStyle }) =>
    isPlaceholderTextStyle ? 'color: #7c9cbf' : ''};

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

const Label = styled.label`
  font-style: normal;
  font-weight: 500;
  font-size: 16px;
  line-height: 21px;
  color: #756f86;
`;
