import React from 'react';

export interface DropdownProps {
  name: string;
  itemList: string[];
  defaultValue: string;
  currentValue: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  onBlur: React.FocusEventHandler<HTMLButtonElement>;
}
