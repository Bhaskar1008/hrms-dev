import React, { useState, useRef, useEffect } from 'react';
import { format } from 'date-fns';
import { Calendar, ChevronLeft, ChevronRight } from 'lucide-react';

interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
  disabled?: boolean;
  minDate?: Date;
  maxDate?: Date;
}

export const DatePicker: React.FC<DatePickerProps> = ({
  value,
  onChange,
  disabled = false,
  minDate,
  maxDate
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [month, setMonth] = useState<Date>(
    value ? new Date(value) : new Date()
  );
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateSelect = (date: Date) => {
    onChange(format(date, 'yyyy-MM-dd'));
    setIsOpen(false);
  };

  const renderCalendar = () => {
    const today = new Date();
    const daysInMonth = new Date(
      month.getFullYear(),
      month.getMonth() + 1,
      0
    ).getDate();
    const firstDayOfMonth = new Date(
      month.getFullYear(),
      month.getMonth(),
      1
    ).getDay();

    const days = [];
    const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

    // Add days of week header
    daysOfWeek.forEach((day) => {
      days.push(
        <div key={`header-${day}`} className="text-center text-xs font-medium text-gray-500 p-2">
          {day}
        </div>
      );
    });

    // Add empty cells for days before the first day of the month
    for (let i = 0; i < firstDayOfMonth; i++) {
      days.push(<div key={`empty-${i}`} className="p-2"></div>);
    }

    // Add days of the month
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(month.getFullYear(), month.getMonth(), i);
      const isToday = date.toDateString() === today.toDateString();
      const isSelected = value && date.toDateString() === new Date(value).toDateString();
      const isDisabled = 
        (minDate && date < minDate) || 
        (maxDate && date > maxDate);
      
      days.push(
        <button
          key={`day-${i}`}
          onClick={() => !isDisabled && handleDateSelect(date)}
          disabled={isDisabled}
          type="button"
          className={`p-2 text-sm rounded-full focus:outline-none ${
            isSelected
              ? 'bg-primary text-white'
              : isToday
              ? 'bg-primary-light text-primary'
              : 'hover:bg-gray-100'
          } ${isDisabled ? 'opacity-40 cursor-not-allowed' : 'cursor-pointer'}`}
        >
          {i}
        </button>
      );
    }

    return (
      <div className="grid grid-cols-7 gap-1 p-2">
        {days}
      </div>
    );
  };

  const previousMonth = () => {
    setMonth(new Date(month.getFullYear(), month.getMonth() - 1, 1));
  };

  const nextMonth = () => {
    setMonth(new Date(month.getFullYear(), month.getMonth() + 1, 1));
  };

  return (
    <div className="relative" ref={ref}>
      <div className="relative">
        <input
          type="text"
          className="block w-full rounded-md border border-gray-300 pl-10 pr-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-primary focus:border-primary"
          placeholder="Select date"
          value={value ? format(new Date(value), 'MMM dd, yyyy') : ''}
          onClick={() => !disabled && setIsOpen(true)}
          readOnly
          disabled={disabled}
        />
        <Calendar className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      
      {isOpen && (
        <div className="absolute z-10 mt-1 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 p-2 w-64">
          <div className="flex justify-between items-center p-2">
            <button
              onClick={previousMonth}
              type="button"
              className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <div className="text-sm font-medium">
              {format(month, 'MMMM yyyy')}
            </div>
            <button
              onClick={nextMonth}
              type="button"
              className="p-1 rounded-full hover:bg-gray-100 focus:outline-none"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>
          {renderCalendar()}
        </div>
      )}
    </div>
  );
};