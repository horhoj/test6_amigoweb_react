import React, { ChangeEventHandler } from 'react';

export interface CheckboxProps {
  name: string;
  onChange: ChangeEventHandler<HTMLInputElement>;
  value: boolean;
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}
