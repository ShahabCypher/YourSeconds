import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

// Custom Calendar Component
interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Parse the date value
  const selectedDate = value ? new Date(value) : new Date();
  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();
  const day = selectedDate.getDate();

  // Get the current month's days
  const daysInMonth = new Date(year, month + 1, 0).getDate();

  // Get the starting day of the month (0 = Sunday, 1 = Monday, etc.)
  const startDay = new Date(year, month, 1).getDay();

  // Generate the days array
  const daysArray = [];
  for (let i = 0; i < startDay; i++) {
    daysArray.push(null); // Empty cells for days before the first day of the month
  }
  for (let i = 1; i <= daysInMonth; i++) {
    daysArray.push(i);
  }

  // Handle date selection
  const handleDayClick = (day: number | null) => {
    if (day !== null) {
      const newDate = new Date(year, month, day);
      const formattedDate = newDate.toISOString().split("T")[0]; // Format as YYYY-MM-DD
      onChange(formattedDate);
      setIsOpen(false);
    }
  };

  // Navigate to previous month
  const prevMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() - 1);
    onChange(newDate.toISOString().split("T")[0]);
  };

  // Navigate to next month
  const nextMonth = () => {
    const newDate = new Date(selectedDate);
    newDate.setMonth(newDate.getMonth() + 1);
    onChange(newDate.toISOString().split("T")[0]);
  };

  // Close calendar when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        datePickerRef.current &&
        !datePickerRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Format month and year for display
  const monthNames = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December",
  ];

  return (
    <div className="relative" ref={datePickerRef}>
      <div
        className="w-full bg-black border border-gray-700 text-red-500 font-digital text-lg p-3 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all rounded-sm cursor-pointer flex items-center justify-between"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span>
          {value
            ? new Date(value).toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })
            : "Select date"}
        </span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          className="h-4 w-4 text-red-500"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
          />
        </svg>
      </div>

      {isOpen && (
        <div
          className="absolute z-10 mt-1 w-full bg-gray-900/95 border border-gray-700 rounded-sm shadow-lg p-3 backdrop-blur-sm"
          style={{ animation: "fadeIn 0.3s ease-in" }}
        >
          {/* Calendar header with navigation */}
          <div className="flex items-center justify-between mb-3">
            <button
              onClick={prevMonth}
              className="p-1 hover:bg-gray-800 rounded-sm transition-colors"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-red-500" />
            </button>

            <span className="font-digital text-red-500 text-base tracking-wider">
              {monthNames[month]} {year}
            </span>

            <button
              onClick={nextMonth}
              className="p-1 hover:bg-gray-800 rounded-sm transition-colors"
              aria-label="Next month"
            >
              <ChevronRight className="w-5 h-5 text-red-500" />
            </button>
          </div>

          {/* Days of week headers */}
          <div className="grid grid-cols-7 gap-1 mb-1">
            {["Su", "Mo", "Tu", "We", "Th", "Fr", "Sa"].map((day) => (
              <div
                key={day}
                className="text-center text-[10px] font-digital text-red-900 py-1 uppercase"
              >
                {day}
              </div>
            ))}
          </div>

          {/* Calendar days */}
          <div className="grid grid-cols-7 gap-1">
            {daysArray.map((day, index) => (
              <div
                key={index}
                onClick={() => handleDayClick(day)}
                className={`text-center text-sm font-digital py-2 cursor-pointer rounded-sm transition-all duration-200 ease-in-out transform hover:scale-105 ${
                  day === null
                    ? "invisible"
                    : selectedDate.getDate() === day &&
                      selectedDate.getMonth() === month &&
                      selectedDate.getFullYear() === year
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30" // Selected day
                    : day === new Date().getDate() &&
                      selectedDate.getMonth() === new Date().getMonth() &&
                      selectedDate.getFullYear() === new Date().getFullYear()
                    ? "text-red-400 font-bold" // Today
                    : "text-red-500 hover:bg-red-900/30"
                }`}
              >
                {day !== null ? day : ""}
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
