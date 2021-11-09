import React, { ChangeEvent, InputHTMLAttributes } from 'react';

export interface InputProps {
  name: string;
  value: string;
  onChange: (e: ChangeEvent) => void;
  label: string;
  placeholder: string;
  error: string | undefined;
  showError: boolean;
  type: InputHTMLAttributes<null>['type'];
  onBlur: React.FocusEventHandler<HTMLInputElement>;
}
