export interface DropdownProps {
  itemList: string[];
  defaultValue: string;
  currentValue: string;
  onChange: (value: string) => void;
}
