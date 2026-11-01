import React from 'react';
import { Calendar as CalendarIcon, MoreHorizontal, ChevronDown } from 'lucide-react';

interface CalendarWidgetProps {
  selectedDate: number | null;
  onSelectDate: (day: number) => void;
}

export const CalendarWidget: React.FC<CalendarWidgetProps> = ({
  selectedDate,
  onSelectDate,
}) => {
  const selectedMonth = 'Sep';

  // Days configuration for September 2025 (matching mockup layout)
  // Su Mo Tu We Th Fr Sa
  // First 4 slots are previous month / empty pattern
  // 1 is Thursday, 2 is Friday, 3 is Saturday
  const daysOfWeek = ['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'];

  // Calendar cells definition
  const cells = [
    { type: 'empty' },
    { type: 'empty' },
    { type: 'empty' },
    { type: 'empty' },
    { day: 1, highlight: 'pink' },
    { day: 2 },
    { day: 3, highlight: 'pink' },
    { day: 4 },
    { day: 5 },
    { day: 6 },
    { day: 7 },
    { day: 8 },
    { day: 9 },
    { day: 10 },
    { day: 11 },
    { day: 12, highlight: 'purple' },
    { day: 13 },
    { day: 14 },
    { day: 15 },
    { day: 16, highlight: 'purple' },
    { day: 17 },
    { day: 18 },
    { day: 19 },
    { day: 20 },
    { day: 21 },
    { day: 22 },
    { day: 23 },
    { day: 24 },
    { day: 25, highlight: 'amber' },
    { day: 26 },
    { day: 27, highlight: 'amber' },
    { day: 28 },
    { day: 29 },
    { day: 30 },
    { type: 'empty' },
  ];

  return (
    <div className="bg-white dark:bg-gray-800/90 rounded-3xl p-5 border border-gray-100/80 dark:border-gray-700/80 shadow-xs transition-all">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <CalendarIcon className="w-4 h-4 text-gray-700 dark:text-gray-300" />
          <h3 className="font-bold text-sm text-gray-900 dark:text-white">Calendar</h3>
        </div>

        <div className="flex items-center gap-2">
          <div className="relative">
            <button className="flex items-center gap-1 text-xs font-semibold text-gray-600 dark:text-gray-300 px-2 py-1 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors">
              <span>{selectedMonth}</span>
              <ChevronDown className="w-3 h-3 text-gray-400" />
            </button>
          </div>
          <button className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 transition-colors">
            <MoreHorizontal className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Weekday labels */}
      <div className="grid grid-cols-7 gap-1 text-center mb-2">
        {daysOfWeek.map((day) => (
          <span
            key={day}
            className="text-[11px] font-medium text-gray-400 dark:text-gray-500 py-1"
          >
            {day}
          </span>
        ))}
      </div>

      {/* Days grid */}
      <div className="grid grid-cols-7 gap-1.5">
        {cells.map((cell, idx) => {
          if (cell.type === 'empty') {
            return (
              <div
                key={`empty-${idx}`}
                className="aspect-square flex items-center justify-center"
              >
                <div className="w-7 h-7 rounded-full bg-gray-100/70 dark:bg-gray-700/40 border border-dashed border-gray-200 dark:border-gray-600/40" />
              </div>
            );
          }

          const dayNum = cell.day as number;
          const isSelected = selectedDate === dayNum;

          let highlightClasses = 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700/60';
          if (cell.highlight === 'pink') {
            highlightClasses = 'bg-rose-100 text-rose-700 dark:bg-rose-950/70 dark:text-rose-300 font-bold';
          } else if (cell.highlight === 'purple') {
            highlightClasses = 'bg-purple-100 text-purple-700 dark:bg-purple-900/60 dark:text-purple-200 font-bold shadow-xs';
          } else if (cell.highlight === 'amber') {
            highlightClasses = 'bg-amber-200/80 text-amber-900 dark:bg-amber-900/60 dark:text-amber-200 font-bold';
          }

          if (isSelected) {
            highlightClasses = 'bg-black text-white dark:bg-white dark:text-black font-extrabold ring-2 ring-purple-500 shadow-md';
          }

          return (
            <button
              key={`day-${dayNum}`}
              onClick={() => onSelectDate(dayNum)}
              className={`aspect-square flex items-center justify-center text-xs rounded-full transition-all cursor-pointer ${highlightClasses}`}
            >
              {dayNum}
            </button>
          );
        })}
      </div>
    </div>
  );
};
