import React from "react";
import { Sunrise, Sun, Sunset, Moon } from "lucide-react";

const getGreeting = () => {
  const now = new Date();
  const tehranTimeStr = now.toLocaleString("en-US", {
    timeZone: "Asia/Tehran",
  });
  const tehranTime = new Date(tehranTimeStr);
  const hour = tehranTime.getHours();

  if (hour >= 5 && hour < 12)
    return {
      text: "صبح بخیر",
      icon: (
        <Sunrise
          className="text-2xl text-yellow-400 animate-bounce"
          style={{ animationDuration: "3s" }}
        />
      ),
    };
  if (hour >= 12 && hour < 17)
    return {
      text: "ظهر بخیر",
      icon: (
        <Sun
          className="text-2xl text-orange-500 animate-spin"
          style={{ animationDuration: "4s" }}
        />
      ),
    };
  if (hour >= 17 && hour < 21)
    return {
      text: "عصر بخیر",
      icon: (
        <Sunset
          className="text-2xl text-red-400 animate-pulse"
          style={{ animationDuration: "2s" }}
        />
      ),
    };
  // شب: 21-4
  return {
    text: "شب بخیر",
    icon: (
      <Moon
        className="text-2xl text-blue-300 animate-pulse"
        style={{ animationDuration: "6s" }}
      />
    ),
  };
};

const getPersianDate = () => {
  const now = new Date();
  const locale = "fa-IR";
  const timeZone = "Asia/Tehran";

  const weekday = new Intl.DateTimeFormat(locale, {
    weekday: "long",
    timeZone,
  }).format(now);
  const day = new Intl.DateTimeFormat(locale, {
    day: "numeric",
    timeZone,
  }).format(now);
  const month = new Intl.DateTimeFormat(locale, {
    month: "long",
    timeZone,
  }).format(now);
  const year = new Intl.DateTimeFormat(locale, {
    year: "numeric",
    timeZone,
  }).format(now);

  return `${weekday} ${day} ${month} ${year}`;
};

const ShowDate = () => {
  const greeting = getGreeting();

  return (
    <div className="absolute bottom-0 left-0 right-0 p-6">
      <div className="bg-white/10 backdrop-blur-sm rounded-xl p-4 text-center">
        <div className="flex items-center justify-center gap-3 mb-3">
          {greeting.icon}
          <span className="text-white font-bold text-lg">{greeting.text}</span>
        </div>
        <div className="text-white/80 text-sm leading-relaxed">
          امروز
          <br />
          {getPersianDate()}
        </div>
      </div>
    </div>
  );
};

export default ShowDate;
