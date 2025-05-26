import React from "react";
import dayjs from "dayjs";
import jalaliday from "jalaliday";
import { Icon } from '@iconify/react';
import sunIcon from '@iconify/icons-feather/sun';
import cloudIcon from '@iconify/icons-feather/cloud';
import moonIcon from '@iconify/icons-feather/moon';

dayjs.extend(jalaliday);

const getGreeting = () => {
  const hour = dayjs().hour();
  if (hour < 12) return { text: "صبح بخیر", icon: sunIcon };
  if (hour < 18) return { text: "ظهر بخیر", icon: cloudIcon };
  return { text: "عصر بخیر", icon: moonIcon };
};

export const getPersianDate = () => {
  return dayjs().calendar("jalali").locale("fa").format("dddd D MMMM YYYY");
};

const ShowDate = () => {
  const greeting = getGreeting();

  return (
    <div className="text-white absolute bottom-0 w-full flex flex-col justify-center items-center p-6">
      <div className="mb-1 text-lg font-semibold flex items-center gap-2">
        <Icon icon={greeting.icon} width="20" height="20" />
        <span>{greeting.text}</span>
      </div>
      <div className="text-sm">امروز {getPersianDate()}</div>
    </div>
  );
};

export default ShowDate;
