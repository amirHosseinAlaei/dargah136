import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { staticCardApi } from "../../service/staticApi";

// هوک بهبود یافته برای تشخیص موبایل
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(() => {
    // بررسی اولیه در سمت کلاینت
    if (typeof window === "undefined") return false;
    return window.innerWidth < 640;
  });

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 640);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return isMobile;
}

// تایپ‌های TypeScript برای بهتر شدن کد
interface CardItem {
  id: string | number;
  title: string;
  description: string;
  img: string;
  link: string;
}

// کامپوننت جداگانه برای کارت‌ها
const CardItem: React.FC<{
  item: CardItem;
  index?: number;
  isListView: boolean;
  onClick: () => void;
}> = React.memo(({ item, index, isListView, onClick }) => {
  if (isListView) {
    return (
      <Button
        onClick={onClick}
        type="text"
        className="w-full flex flex-row items-start border-none text-black rounded-lg hover:shadow-md transition-all duration-300 p-3 bg-white hover:bg-gray-50 min-h-[70px]"
        aria-label={`رفتن به ${item.title}`}
      >
        {typeof index === "number" && (
          <span className="text-gray-500 font-bold w-8 text-center text-sm flex-shrink-0 mt-1">
            {index + 1}
          </span>
        )}
        <div className="w-12 h-12 flex items-center justify-center mx-3 flex-shrink-0">
          <img
            src={item.img}
            alt={item.title}
            loading="lazy"
            className="max-w-full max-h-full object-contain"
          />
        </div>
        <div className="flex-1 text-right min-w-0">
          <div className="text-sm font-medium text-gray-800 mb-1 break-words whitespace-normal leading-relaxed">
            {item.title}
          </div>
          <div className="text-xs text-gray-600 break-words whitespace-normal leading-relaxed">
            {item.description}
          </div>
        </div>
      </Button>
    );
  }

  return (
    <Button
      onClick={onClick}
      type="text"
      className="!p-4 w-full h-auto flex flex-col items-center justify-start border-none text-black rounded-lg hover:shadow-lg transition-all duration-300 bg-white hover:bg-gray-50"
      style={{ minHeight: "180px" }}
      aria-label={`رفتن به ${item.title}`}
    >
      <div className="w-16 h-16 flex items-center justify-center mb-3 flex-shrink-0">
        <img
          src={item.img}
          alt={item.title}
          loading="lazy"
          className="max-w-full max-h-full object-contain"
        />
      </div>
      <div className="w-full flex flex-col items-center text-center space-y-2">
        <h3 className="text-base sm:text-lg font-semibold break-words whitespace-normal leading-tight w-full">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-600 break-words whitespace-normal leading-relaxed w-full">
          {item.description}
        </p>
      </div>
    </Button>
  );
});

CardItem.displayName = "CardItem";

// کامپوننت اصلی
function LandingContent() {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const { data, isLoading, isError, error, refetch } = useQuery({
    queryKey: ["static-cards"],
    queryFn: staticCardApi,
    staleTime: 5 * 60 * 1000, // 5 دقیقه
    retry: 2,
  });

  // محاسبه تعداد حالت‌های نمایش
  const modeCount = useMemo(() => (isMobile ? 2 : 3), [isMobile]);
  const [viewMode, setViewMode] = useState(0);

  // آیکون‌های مربوط به حالت‌های مختلف
  const modeIcons = useMemo(() => {
    return isMobile
      ? ["material-symbols:grid-view-outline", "material-symbols:list"]
      : [
          "material-symbols:grid-view-outline",
          "material-symbols:grid-3x3",
          "material-symbols:list",
        ];
  }, [isMobile]);

  // تغییر حالت نمایش
  const handleChangeMode = useCallback(() => {
    setViewMode((prev) => (prev + 1) % modeCount);
  }, [modeCount]);

  // ناوبری به صفحه مورد نظر
  const handleNavigate = useCallback(
    (link: string) => {
      navigate(link);
    },
    [navigate]
  );

  // محاسبه کلاس CSS برای grid
  const gridClass = useMemo(() => {
    const isListView =
      (isMobile && viewMode === 1) || (!isMobile && viewMode === 2);

    if (isListView) {
      return "flex flex-col gap-1";
    }

    if (isMobile) {
      return "grid grid-cols-1 gap-4";
    }

    // حالت‌های مختلف برای دسکتاپ
    if (viewMode === 0) {
      return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start"; // 4 ستون
    } else if (viewMode === 1) {
      return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start"; // 3 ستون
    }

    return "grid grid-cols-1 sm:grid-cols-2 gap-4 items-start"; // 2 ستون (fallback)
  }, [isMobile, viewMode]);

  // بررسی حالت لیست
  const isListView = useMemo(() => {
    return (isMobile && viewMode === 1) || (!isMobile && viewMode === 2);
  }, [isMobile, viewMode]);

  // حالت‌های مختلف UI
  if (isLoading) {
    return (
      <div className="flex items-center justify-center py-12">
        <div className="text-center">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">در حال بارگذاری...</p>
        </div>
      </div>
    );
  }

  if (isError) {
    return (
      <div className="text-center py-12">
        <div className="bg-red-50 border border-red-200 rounded-lg p-6 max-w-md mx-auto">
          <Icon
            icon="mdi:alert-circle"
            className="text-red-500 text-4xl mx-auto mb-4"
          />
          <h3 className="text-lg font-semibold text-red-800 mb-2">
            خطا در بارگذاری
          </h3>
          <p className="text-red-600 mb-4">
            {error?.message || "مشکلی در دریافت اطلاعات به وجود آمده"}
          </p>
          <Button
            onClick={() => refetch()}
            type="primary"
            className="!bg-red-600 hover:!bg-red-700"
          >
            تلاش مجدد
          </Button>
        </div>
      </div>
    );
  }

  const items: CardItem[] = data || [];

  if (!items.length) {
    return (
      <div className="text-center py-12">
        <Icon
          icon="mdi:inbox-outline"
          className="text-gray-400 text-6xl mx-auto mb-4"
        />
        <p className="text-gray-500 text-lg">هیچ داده‌ای یافت نشد</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen px-2 sm:px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto">
        {/* هدر با دکمه تغییر حالت */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            خدمات ({items.length})
          </h1>

          {/* دکمه بهبود یافته با گرادینت و طراحی مینیمال */}
          <button
            onClick={handleChangeMode}
            aria-label="تغییر حالت نمایش"
            className="group relative overflow-hidden rounded-xl p-3 bg-gradient-to-br from-slate-100 via-white to-slate-50 hover:from-slate-200 hover:via-slate-100 hover:to-slate-100 border border-slate-200/60 hover:border-slate-300/80 shadow-sm hover:shadow-md transition-all duration-300 ease-out active:scale-95"
          >
            {/* گرادینت پس‌زمینه انیمیشن‌دار */}
            <div className="absolute inset-0 bg-gradient-to-br from-blue-50/30 via-indigo-50/20 to-purple-50/30 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>

            {/* آیکون */}
            <div className="relative z-10 flex items-center justify-center">
              <Icon
                icon={modeIcons[viewMode]}
                className="text-xl text-slate-600 group-hover:text-slate-700 transition-colors duration-200 group-hover:scale-110 transform transition-transform duration-200"
              />
            </div>

            {/* افکت نور */}
            <div className="absolute inset-0 rounded-xl bg-gradient-to-br from-white/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </button>
        </div>

        {/* محتوای اصلی */}
        <div className={gridClass}>
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <CardItem
                item={item}
                index={isListView ? index : undefined}
                isListView={isListView}
                onClick={() => handleNavigate(item.link)}
              />
              {/* خط جداکننده برای حالت لیست */}
              {isListView && index !== items.length - 1 && (
                <div className="border-b border-dashed border-gray-300 mx-4" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingContent;
