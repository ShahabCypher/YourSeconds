import React, { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, CalendarIcon } from "lucide-react";

// Custom Calendar Component
interface DatePickerProps {
  value: string;
  onChange: (date: string) => void;
}

export const DatePicker: React.FC<DatePickerProps> = ({ value, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [selectedMonth, setSelectedMonth] = useState<number>(0);
  const [selectedYear, setSelectedYear] = useState<number>(2000);
  const datePickerRef = useRef<HTMLDivElement>(null);

  // Parse the date value
  const selectedDate = value ? new Date(value) : new Date();
  const month = selectedDate.getMonth();
  const year = selectedDate.getFullYear();
  const day = selectedDate.getDate();

  // Initialize selected month and year based on current value
  useEffect(() => {
    setSelectedMonth(month);
    setSelectedYear(year);
  }, [value]);

  // Get the current month's days
  const daysInMonth = new Date(selectedYear, selectedMonth + 1, 0).getDate();

  // Get the starting day of the month (0 = Sunday, 1 = Monday, etc.)
  const startDay = new Date(selectedYear, selectedMonth, 1).getDay();

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
      // Create date with UTC to avoid timezone issues causing day offset
      const newDate = new Date(Date.UTC(selectedYear, selectedMonth, day));
      // Format as YYYY-MM-DD without timezone adjustments
      const formattedDate = `${newDate.getUTCFullYear()}-${String(
        newDate.getUTCMonth() + 1
      ).padStart(2, "0")}-${String(newDate.getUTCDate()).padStart(2, "0")}`;
      onChange(formattedDate);
      setIsOpen(false);
    }
  };

  // Navigate to previous month
  const prevMonth = () => {
    if (selectedMonth === 0) {
      setSelectedMonth(11);
      setSelectedYear(selectedYear - 1);
    } else {
      setSelectedMonth(selectedMonth - 1);
    }
  };

  // Navigate to next month
  const nextMonth = () => {
    if (selectedMonth === 11) {
      setSelectedMonth(0);
      setSelectedYear(selectedYear + 1);
    } else {
      setSelectedMonth(selectedMonth + 1);
    }
  };

  // Handle month change from dropdown
  const handleMonthChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedMonth(parseInt(e.target.value));
  };

  // Handle year change from dropdown
  const handleYearChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setSelectedYear(parseInt(e.target.value));
  };

  // Generate years range for dropdown (from 1900 to 10 years in the future)
  const generateYears = () => {
    const currentYear = new Date().getFullYear();
    const startYear = 1900;
    const endYear = currentYear + 10;
    const years = [];
    for (let y = startYear; y <= endYear; y++) {
      years.push(y);
    }
    return years;
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
        onClick={(e) => {
          e.preventDefault();
          e.stopPropagation();
          setIsOpen(!isOpen);
        }}
      >
        <span>
          {value
            ? new Date(value).toLocaleDateString("en-US", {
                year: "numeric",
                month: "numeric",
                day: "numeric",
              })
            : "Select Date of Birth"}
        </span>
        <CalendarIcon className="w-4 h-4 text-red-500" />
      </div>

      {isOpen && (
        <div
          className="absolute z-10 mt-1 w-full bg-gray-900/95 border border-gray-700 rounded-sm shadow-lg p-3 backdrop-blur-sm max-h-[400px] overflow-hidden"
          style={{
            animation: "fadeIn 0.3s ease-in",
            boxShadow: "0 4px 20px rgba(220, 38, 38, 0.15)",
          }}
        >
          {/* Calendar header with navigation and controls */}
          <div className="flex flex-wrap items-center justify-between gap-2 mb-3">
            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                prevMonth();
              }}
              className="p-1 hover:bg-gray-800 rounded-sm transition-colors flex-shrink-0"
              aria-label="Previous month"
            >
              <ChevronLeft className="w-5 h-5 text-red-500" />
            </button>

            <div className="flex flex-wrap gap-2 items-center">
              <select
                value={selectedMonth}
                onChange={handleMonthChange}
                className="bg-gray-800 text-red-500 font-digital text-sm p-1 border border-gray-700 rounded-sm focus:outline-none focus:ring-1 focus:ring-red-600 calendar-dropdown"
              >
                {monthNames.map((name, index) => (
                  <option key={index} value={index}>
                    {name.substring(0, 3)} {/* Abbreviated month name */}
                  </option>
                ))}
              </select>

              <select
                value={selectedYear}
                onChange={handleYearChange}
                className="bg-gray-800 text-red-500 font-digital text-sm p-1 border border-gray-700 rounded-sm focus:outline-none focus:ring-1 focus:ring-red-600 calendar-dropdown"
              >
                {generateYears().map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
              </select>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.preventDefault();
                e.stopPropagation();
                nextMonth();
              }}
              className="p-1 hover:bg-gray-800 rounded-sm transition-colors flex-shrink-0"
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
          <div className="grid grid-cols-7 gap-1 max-h-60 overflow-y-auto pb-1 calendar-days-container">
            {daysArray.map((day, index) => (
              <div
                key={index}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                  handleDayClick(day);
                }}
                className={`text-center text-sm font-digital py-2 cursor-pointer rounded-sm transition-all duration-200 ease-in-out transform hover:scale-105 ${
                  day === null
                    ? "invisible"
                    : new Date(value).getDate() === day &&
                      new Date(value).getMonth() === selectedMonth &&
                      new Date(value).getFullYear() === selectedYear
                    ? "bg-red-600 text-white shadow-lg shadow-red-600/30 font-bold" // Selected day
                    : day === new Date().getDate() &&
                      selectedMonth === new Date().getMonth() &&
                      selectedYear === new Date().getFullYear()
                    ? "text-red-400 font-bold" // Today
                    : day
                    ? "text-red-500 hover:bg-red-900/30 cursor-pointer"
                    : ""
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

// CSS for the fade-in animation (added in a style tag)
if (typeof document !== "undefined") {
  const style = document.createElement("style");
  style.innerHTML = `
    @keyframes fadeIn {
      from { opacity: 0; transform: translateY(-10px); }
      to { opacity: 1; transform: translateY(0); }
    }

    /* Smooth scrolling for calendar day container */
    .calendar-days-container::-webkit-scrollbar {
      width: 6px;
    }

    .calendar-days-container::-webkit-scrollbar-track {
      background: #1f2937; /* gray-800 */
    }

    .calendar-days-container::-webkit-scrollbar-thumb {
      background: #dc2626; /* red-600 */
      border-radius: 3px;
    }

    .calendar-days-container::-webkit-scrollbar-thumb:hover {
      background: #b91c1c; /* red-700 */
    }

    /* Minimalist scrollbar for month/year dropdowns */
    .calendar-dropdown::-webkit-scrollbar {
      width: 4px;
    }

    .calendar-dropdown::-webkit-scrollbar-track {
      background: transparent;
    }

    .calendar-dropdown::-webkit-scrollbar-thumb {
      background: #4b5563; /* Gray-600 */
      border-radius: 2px;
    }

    .calendar-dropdown::-webkit-scrollbar-thumb:hover {
      background: #374151; /* Gray-700 */
    }
  `;
  document.head.appendChild(style);
}
