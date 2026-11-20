import { Check, ChevronDown } from 'lucide-react';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectItemIndicator,
  SelectTrigger,
  SelectValue
} from '@ui-sdk/react/select';

export function SelectField({ label, name, value, onChange, options, placeholder = 'Choose an option' }) {
  const items = options.map((option) => typeof option === 'string' ? { value: option, label: option } : option);

  return (
    <div className="field">
      <Select items={items} name={name} value={value} onValueChange={onChange}>
        <span className="field-label" id={`${name}-label`}>{label}</span>
        <SelectTrigger aria-labelledby={`${name}-label`}>
          <SelectValue placeholder={placeholder} />
          <ChevronDown aria-hidden="true" />
        </SelectTrigger>
        <SelectContent className="select-content" sideOffset={6}>
          {items.map((item) => (
            <SelectItem key={item.value} value={item.value} className="select-item">
              {item.label}
              <SelectItemIndicator><Check aria-hidden="true" /></SelectItemIndicator>
            </SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
  );
}
