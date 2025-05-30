import React from "react";
import { Sunrise, Sun, Sunset, Moon } from "lucide-react";

// استایل‌های بسیار ملایم و subtle
const customStyles = `
@keyframes sunrise-bounce {
  0%, 100% { transform: translateY(0);}
  50% { transform: translateY(-1.5px);}
}
@keyframes sun-spin {
  0% { transform: rotate(0deg);}
  100% { transform: rotate(360deg);}
}
@keyframes sunset-bounce {
  0%, 100% { transform: translateY(0);}
  50% { transform: translateY(1.5px);}
}
@keyframes moon-sway {
  0%, 100% { transform: translateX(0);}
  50% { transform: translateX(2px);}
}
.sunrise-anim {
  animation: sunrise-bounce 5s infinite;
}
.sun-anim {
  animation: sun-spin 20s linear infinite;
}
.sunset-anim {
  animation: sunset-bounce 5s infinite;
}
.moon-anim {
  animation: moon-sway 10s ease-in-out infinite;
}
`;

const getGreeting = () => {
  const now = new Date();
  const tehranTimeStr = now.toLocaleString("en-US", {
    timeZone: "Asia/Tehran",
  });
  const tehranTime = new Date(tehranTimeStr);
  const hour = tehranTime.getHours();

  if (hour >= 4 && hour < 12)
    return {
      text: "صبح بخیر",
      icon: <Sunrise className="text-2xl text-blue-300 sunrise-anim" />,
    };
  if (hour >= 12 && hour < 16)
    return {
      text: "ظهر بخیر",
      icon: <Sun className="text-2xl text-blue-300 sun-anim" />,
    };
  if (hour >= 16 && hour < 20)
    return {
      text: "عصر بخیر",
      icon: <Sunset className="text-2xl text-blue-300 sunset-anim" />,
    };
  // شب: 20 تا 4 صبح
  return {
    text: "شب بخیر",
    icon: <Moon className="text-2xl text-blue-300 moon-anim" />,
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
      {/* اضافه کردن استایل‌های سفارشی به صفحه */}
      <style>{customStyles}</style>
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
