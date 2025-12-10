import React, { useState, useEffect } from "react";
import { Cog, Activity } from "lucide-react";

import { UserData } from "./types";
import { getCookie, setCookie } from "./utils/cookieUtils";
import { Countdown } from "./components/Countdown";
import { SettingsForm } from "./components/SettingsForm";

const COOKIE_NAME = "your_seconds_data";

export default function App() {
  const [userData, setUserData] = useState<UserData | null>(null);
  const [isSettingsOpen, setIsSettingsOpen] = useState<boolean>(true);
  const [loading, setLoading] = useState<boolean>(true);

  // Load data from cookies on mount
  useEffect(() => {
    const savedData = getCookie(COOKIE_NAME);
    if (savedData) {
      try {
        const parsed: UserData = JSON.parse(savedData);
        setUserData(parsed);
        setIsSettingsOpen(false);
      } catch (e) {
        console.error("Failed to parse cookie data", e);
      }
    }
    setLoading(false);
  }, []);

  const handleSave = (data: UserData) => {
    setUserData(data);
    setCookie(COOKIE_NAME, JSON.stringify(data), 365); // Save for 1 year
    setIsSettingsOpen(false);
  };

  const handleOpenSettings = () => {
    setIsSettingsOpen(true);
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-black flex items-center justify-center text-red-600">
        Loading...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black flex flex-col items-center justify-center relative overflow-hidden selection:bg-red-900 selection:text-white">
      {/* Background Ambience */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_var(--tw-gradient-stops))] from-gray-900 via-black to-black opacity-50 z-0 pointer-events-none" />

      {/* Header / Controls */}
      <div className="absolute top-0 right-0 p-6 z-20">
        {!isSettingsOpen && (
          <button
            onClick={handleOpenSettings}
            className="text-gray-600 hover:text-red-500 transition-colors duration-300 group flex items-center gap-2"
          >
            <span className="text-xs uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">
              Settings
            </span>
            <Cog className="w-6 h-6 group-hover:rotate-90 transition-transform duration-500" />
          </button>
        )}
      </div>

      <div className="absolute top-6 left-6 z-20 flex items-center gap-2 font-semibold">
        <Activity className="w-5 h-5 text-red-900" />
        <span className="text-red-900 font-digital text-xs tracking-[0.2em] uppercase">
          Your Seconds
        </span>
      </div>

      {/* Main Content Area */}
      <main className="z-10 w-full max-w-4xl px-4 flex flex-col items-center">
        {isSettingsOpen ? (
          <SettingsForm
            initialData={userData}
            onSave={handleSave}
            onCancel={userData ? () => setIsSettingsOpen(false) : undefined}
          />
        ) : (
          userData && <Countdown userData={userData} />
        )}
      </main>

      {/* Footer */}
      <footer className="absolute bottom-4 text-gray-700 text-xs text-center w-full z-10 font-digital select-none">
        MEMENTO MORI - By{" "}
        <a
          className="text-gray-600 underline"
          href="https://shahabcypher.ir"
          target="_blank"
        >
          Cypher
        </a>
      </footer>
    </div>
  );
}
