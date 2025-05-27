import React from "react";
import { Icon } from "@iconify/react";
import sunIcon from "@iconify/icons-feather/sun";
import cloudIcon from "@iconify/icons-feather/cloud";
import moonIcon from "@iconify/icons-feather/moon";

const getGreeting = () => {
  const now = new Date();
  const tehranTimeStr = now.toLocaleString("en-US", { timeZone: "Asia/Tehran" });
  const tehranTime = new Date(tehranTimeStr);
  const hour = tehranTime.getHours();

  if (hour < 12) return { text: "صبح بخیر", icon: sunIcon };
  if (hour < 18) return { text: "ظهر بخیر", icon: cloudIcon };
  return { text: "عصر بخیر", icon: moonIcon };
};

const getPersianDate = () => {
  const now = new Date();
  const locale = "fa-IR";
  const timeZone = "Asia/Tehran";

  const weekday = new Intl.DateTimeFormat(locale, { weekday: "long", timeZone }).format(now);
  const day = new Intl.DateTimeFormat(locale, { day: "numeric", timeZone }).format(now);
  const month = new Intl.DateTimeFormat(locale, { month: "long", timeZone }).format(now);
  const year = new Intl.DateTimeFormat(locale, { year: "numeric", timeZone }).format(now);

  return `${weekday} ${day} ${month} ${year}`;
};

const ShowDate = () => {
  const greeting = getGreeting();

  const animationClass =
    greeting.icon === sunIcon
      ? "spin"
      : greeting.icon === cloudIcon
      ? "float"
      : "glow";

  return (
    <div className="text-white absolute bottom-0 w-full flex flex-col justify-center items-center p-6 space-y-2">
      <div className="mb-1 text-lg font-semibold flex items-center gap-2">
        <Icon icon={greeting.icon} width={20} height={20} className={animationClass} />
        <span className="font-bold">{greeting.text}</span>
      </div>
      <div className="text-center">
        امروز <br />
        {getPersianDate()}
      </div>
    </div>
  );
};

export default ShowDate;