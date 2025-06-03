import { Icon } from "@iconify/react";

const icons = {
  morning: "ph:sun-fill",
  noon: "ph:sun-dim",
  evening: "mdi:weather-sunset",
  night: "ph:moon-stars-fill",
};

const customStyles = `
  @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
  @keyframes bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-6px); } }
  @keyframes subtle-bounce { 0%, 100% { transform: translateY(0); } 50% { transform: translateY(-3px); } }
  @keyframes sway { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(4px); } }

  .spin { animation: spin 20s linear infinite; }
  .bounce { animation: bounce 4s ease-in-out infinite; }
  .subtle-bounce { animation: subtle-bounce 5s ease-in-out infinite; }
  .sway { animation: sway 6s ease-in-out infinite; }
`;

const getTehranHour = () => {
  const now = new Date();
  const options: Intl.DateTimeFormatOptions = {
    hour: "2-digit",
    hour12: false,
    timeZone: "Asia/Tehran",
  };
  const hourStr = new Intl.DateTimeFormat("en-US", options).format(now);
  return Number(hourStr);
};

const getGreeting = () => {
  const hour = getTehranHour();

  if (hour >= 4 && hour < 12)
    return {
      text: "صبح بخیر",
      icon: (
        <Icon
          icon={icons.morning}
          className="text-2xl spin"
          style={{ color: "#facc15" }}
        />
      ),
    };
  if (hour >= 12 && hour < 16)
    return {
      text: "ظهر بخیر",
      icon: (
        <Icon
          icon={icons.noon}
          className="text-2xl bounce"
          style={{ color: "#f59e0b" }}
        />
      ),
    };
  if (hour >= 16 && hour < 20)
    return {
      text: "عصر بخیر",
      icon: (
        <Icon
          icon={icons.evening}
          className="text-2xl subtle-bounce"
          style={{ color: "#fbbf24" }}
        />
      ),
    };

  return {
    text: "شب بخیر",
    icon: (
      <Icon
        icon={icons.night}
        className="text-2xl sway"
        style={{ color: "#3b82f6" }}
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
    <div className="absolute bottom-0 left-0 right-0 p-4">
      <style>{customStyles}</style>
      <div className="bg-white/20 backdrop-blur rounded-lg p-4 text-center max-w-sm mx-auto">
        <div className="flex items-center justify-center gap-3 mb-3">
          {greeting.icon}
          <span className="text-white font-extrabold text-lg">
            {greeting.text}
          </span>
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
