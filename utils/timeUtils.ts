import { UserData, TimeBreakdown } from "../types";

export const calculateTimeLeft = (userData: UserData): TimeBreakdown => {
  const { dateOfBirth, lifespanYears } = userData;

  const birthDate = new Date(dateOfBirth);
  const now = new Date();

  // Calculate death date
  const deathDate = new Date(birthDate);
  deathDate.setFullYear(deathDate.getFullYear() + lifespanYears);

  const diffInMs = deathDate.getTime() - now.getTime();

  if (diffInMs <= 0) {
    return {
      totalSeconds: 0,
      years: 0,
      days: 0,
      hours: 0,
      minutes: 0,
      seconds: 0,
    };
  }

  const totalSeconds = Math.floor(diffInMs / 1000);

  // Calculate breakdown
  const years = Math.floor(totalSeconds / (3600 * 24 * 365));
  const days = Math.floor((totalSeconds % (3600 * 24 * 365)) / (3600 * 24));
  const hours = Math.floor((totalSeconds % (3600 * 24)) / 3600);
  const minutes = Math.floor((totalSeconds % 3600) / 60);
  const seconds = Math.floor(totalSeconds % 60);

  return {
    totalSeconds,
    years,
    days,
    hours,
    minutes,
    seconds,
  };
};

export const formatNumber = (num: number, pad = 2): string => {
  return num.toString().padStart(pad, "0");
};

export const formatLargeNumber = (num: number): string => {
  return new Intl.NumberFormat("en-US").format(num);
};
