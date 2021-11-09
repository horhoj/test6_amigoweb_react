import React, { useCallback, useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { DropdownProps } from './types';
import { useOutsideClick } from './useOutsideClick';
import icon from './icons/Icon.svg';

export const Dropdown: React.FC<DropdownProps> = ({
  itemList,
  value,
  onChange,
  label,
  placeholder,
  onBlur,
  name,
}) => {
  //флаг отвечает за показ списка элементов
  const [isShowItemList, setIsShowItemList] = useState<boolean>(false);

  //выбранный текущий элемент, при управлении с клавиатуры
  const [selectedItemId, setSelectedItemId] = useState<number>(0);

  //флаг отвечает за то были ли нажаты Enter или Tab, что считается
  // успешным выбором элемента пользователем при управлении с клавиатуры
  const [isEnterOrTabKeyPressed, setIsEnterOrTabKeyPressed] =
    useState<boolean>(false);

  //этот хук срабатывает если во время показа списка были нажаты
  //Enter или Tab, что считается успешным выбором элемента пользователем
  //при управлении с клавиатуры
  useEffect(() => {
    if (isEnterOrTabKeyPressed) {
      onChange(itemList[selectedItemId].value);
      setIsEnterOrTabKeyPressed(false);
    }
  }, [isEnterOrTabKeyPressed]);

  //этот хук отвечает за скрытие списка
  //при щелчке вне пределов Компонента
  const ref = useRef<HTMLDivElement>(null);
  useOutsideClick(ref, () => setIsShowItemList(false));

  //этот хук отвечает за обработку клавиш когда отображается список элементов
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
      //перемещаемся по списку вверх нажимая стрелку вверх
      if (e.key === 'ArrowUp') {
        setSelectedItemId((prev) => {
          if (prev === 0) {
            return 0;
          }
          return prev - 1;
        });
      }
      //перемещаемся по списку вниз нажимая стрелку вверх
      if (e.key === 'ArrowDown') {
        setSelectedItemId((prev) => {
          if (prev === itemList.length - 1) {
            return prev;
          }
          return prev + 1;
        });
      }
    };

    if (isShowItemList) {
      //убираем или добавляем обработчики нажатия клавиш, в зависимости
      //от показа списка элементов
      document.removeEventListener('keydown', handleKeyPressed);
      document.addEventListener('keydown', handleKeyDown);
    }

    return () => {
      //убираем или добавляем обработчики нажатия клавиш, в зависимости
      //от показа списка элементов
      document.removeEventListener('keydown', handleKeyDown);
      document.addEventListener('keydown', handleKeyPressed);
    };
  }, [isShowItemList]);

  const handleBtnClk = () => {
    setIsShowItemList((prev) => !prev);
    const currentItemIndex = itemList.findIndex((item) => item.value === value);
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
      onClick={() => handleItemClk(item.value)}
      isSelected={selectedItemId === index}
    >
      {item.title}
    </Item>
  ));

  const getTitle = (): string => {
    const index = itemList.findIndex((item) => item.value === value);
    if (index >= 0) {
      return itemList[index].title;
    }
    return placeholder;
  };

  const title = getTitle();

  //этот обработчик нажатия кнопок срабатывает
  //когда главный элемент управления данного компонента(StyledButton) получает фокус
  const handleKeyPressed = useCallback(
    (e: KeyboardEvent) => {
      //по нажатию стрелки вниз
      //раскрывается список
      if (e.key === 'ArrowDown') {
        setIsShowItemList(true);
      }
    },
    [setIsShowItemList],
  );

  return (
    <Wrap ref={ref}>
      <div>
        <Label>{label}</Label>
      </div>
      <ButtonWrap>
        <StyledButton
          type={'button'}
          onClick={handleBtnClk}
          isPlaceholderTextStyle={title === placeholder}
          onBlur={(e) => {
            onBlur(e);
            document.removeEventListener('keydown', handleKeyPressed);
          }}
          onFocus={() => {
            document.addEventListener('keydown', handleKeyPressed);
          }}
          name={name}
        >
          {title}
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
  z-index: 100;
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
