import React from 'react';

interface CheckboxOption {
  label: string;
  value: any;
}

interface CheckboxGroupProps {
  options: CheckboxOption[];
  value: any[];
  onChange: (value: any[]) => void;
  disabled?: boolean;
}

export const CheckboxGroup: React.FC<CheckboxGroupProps> = ({
  options,
  value = [],
  onChange,
  disabled = false
}) => {
  const handleCheckboxChange = (option: any) => {
    if (value.includes(option)) {
      onChange(value.filter(item => item !== option));
    } else {
      onChange([...value, option]);
    }
  };

  return (
    <div className="space-y-2">
      {options.map((option) => (
        <div key={option.value} className="flex items-center">
          <input
            type="checkbox"
            id={`option-${option.value}`}
            checked={value.includes(option.value)}
            onChange={() => handleCheckboxChange(option.value)}
            disabled={disabled}
            className="h-4 w-4 text-primary focus:ring-primary border-gray-300 rounded"
          />
          <label
            htmlFor={`option-${option.value}`}
            className="ml-2 block text-sm text-gray-700"
          >
            {option.label}
          </label>
        </div>
      ))}
    </div>
  );
};