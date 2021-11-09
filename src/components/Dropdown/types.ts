import React from 'react';

export interface DropdownProps {
  name: string;
  itemList: DropdownItem[];
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  onBlur: React.FocusEventHandler<HTMLButtonElement>;
}

export interface DropdownItem {
  id: number;
  value: string;
  title: string;
}
