import React, { useState } from "react";
import { Save, X } from "lucide-react";

import { UserData } from "../types";
import { DatePicker } from "./Calendar";

interface SettingsFormProps {
  initialData: UserData | null;
  onSave: (data: UserData) => void;
  onCancel?: () => void;
}

export const SettingsForm: React.FC<SettingsFormProps> = ({
  initialData,
  onSave,
  onCancel,
}) => {
  const [dob, setDob] = useState<string>(initialData?.dateOfBirth || "");
  const [lifespan, setLifespan] = useState<number>(
    initialData?.lifespanYears || 80
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (dob && lifespan > 0) {
      onSave({
        dateOfBirth: dob,
        lifespanYears: lifespan,
      });
    }
  };

  return (
    <div className="w-full max-w-md bg-gray-900/80 border border-gray-800 p-8 rounded-lg shadow-2xl backdrop-blur-md relative select-none">
      {/* Decorative scanline */}
      <div className="absolute top-0 left-0 w-full h-1 bg-linear-to-r from-transparent via-red-600 to-transparent opacity-50"></div>

      <h2 className="text-xl sm:text-2xl font-digital text-red-500 mb-6 tracking-wider flex items-center gap-2">
        <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse"></span>
        INITIALIZE
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date of Birth Input */}
        <div className="space-y-2">
          <label
            htmlFor="dob"
            className="block text-xs uppercase tracking-widest text-gray-500 font-bold"
          >
            Date of Birth
          </label>
          <div className="relative">
            <DatePicker value={dob} onChange={setDob} />
          </div>
        </div>

        {/* Lifespan Input */}
        <div className="space-y-2">
          <label
            htmlFor="lifespan"
            className="block text-xs uppercase tracking-widest text-gray-500 font-bold"
          >
            Expected Lifespan (Years)
          </label>
          <div className="relative">
            <input
              id="lifespan"
              type="number"
              min="1"
              max="150"
              required
              value={lifespan}
              onChange={(e) => setLifespan(Number(e.target.value))}
              className="w-full bg-black border border-gray-700 text-red-500 font-digital text-base sm:text-lg p-2 sm:p-3 focus:outline-none focus:border-red-600 focus:ring-1 focus:ring-red-600 transition-all rounded-sm"
            />
            <span className="absolute right-3 sm:right-4 top-1/2 -translate-y-1/2 text-gray-700 text-sm font-digital">
              YRS
            </span>
          </div>
          <p className="text-[8px] sm:text-[10px] text-gray-600 mt-1">
            Global average is approximately 73 years.
          </p>
        </div>

        {/* Actions */}
        <div className="pt-4 flex gap-4">
          <button
            type="submit"
            className="flex-1 bg-red-900/20 hover:bg-red-600/20 text-red-500 border border-red-900 hover:border-red-500 transition-all p-3 rounded-sm flex items-center justify-center gap-2 font-digital tracking-widest uppercase group"
          >
            <Save className="w-4 h-4" />
            <span className="group-hover:text-glow-red transition-all">
              Start Timer
            </span>
          </button>

          {onCancel && (
            <button
              type="button"
              onClick={onCancel}
              className="px-4 border border-gray-800 text-gray-500 hover:text-gray-300 hover:border-gray-600 transition-all rounded-sm"
            >
              <X className="w-5 h-5" />
            </button>
          )}
        </div>
      </form>
    </div>
  );
};
