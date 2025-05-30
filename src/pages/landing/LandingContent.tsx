import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { staticCardApi } from "../../service/staticApi";

// هوک تشخیص موبایل
function useIsMobile() {
  const [isMobile, setIsMobile] = useState(
    typeof window === "undefined" ? false : window.innerWidth < 640
  );
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 640);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);
  return isMobile;
}

// تایپ کارت
interface CardItem {
  id: string | number;
  title: string;
  description: string;
  img: string;
  link: string;
}

// کارت
const CardItem: React.FC<{
  item: CardItem;
  index?: number;
  isListView: boolean;
  onClick: () => void;
}> = React.memo(({ item, index, isListView, onClick }) => {
  if (isListView) {
    return (
      <button
        onClick={onClick}
        className="w-full flex flex-row items-start rounded-lg transition-colors duration-150 p-3 hover:bg-gray-50 focus:bg-gray-100 outline-none"
        aria-label={`رفتن به ${item.title}`}
        type="button"
      >
        {typeof index === "number" && (
          <span className="text-gray-400 font-bold w-8 text-center text-sm flex-shrink-0 mt-1">
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
          <div className="text-xs text-gray-500 break-words whitespace-normal leading-relaxed">
            {item.description}
          </div>
        </div>
      </button>
    );
  }

  return (
    <button
      onClick={onClick}
      className="p-4 w-full h-auto flex flex-col items-center justify-start rounded-lg transition-colors duration-150 hover:bg-gray-50 focus:bg-gray-100 outline-none"
      type="button"
      style={{ minHeight: 180 }}
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
        <p className="text-xs sm:text-sm text-gray-500 break-words whitespace-normal leading-relaxed w-full">
          {item.description}
        </p>
      </div>
    </button>
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
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  const modeCount = useMemo(() => (isMobile ? 2 : 3), [isMobile]);
  const [viewMode, setViewMode] = useState(0);

  const modeIcons = useMemo(() => {
    return isMobile
      ? ["material-symbols:grid-view-outline", "material-symbols:list"]
      : [
          "material-symbols:grid-view-outline",
          "material-symbols:grid-3x3",
          "material-symbols:list",
        ];
  }, [isMobile]);

  const handleChangeMode = useCallback(() => {
    setViewMode((prev) => (prev + 1) % modeCount);
  }, [modeCount]);

  const handleNavigate = useCallback(
    (link: string) => {
      navigate(link);
    },
    [navigate]
  );

  const gridClass = useMemo(() => {
    const isListView =
      (isMobile && viewMode === 1) || (!isMobile && viewMode === 2);

    if (isListView) {
      return "flex flex-col gap-1";
    }
    if (isMobile) {
      return "grid grid-cols-1 gap-4";
    }
    if (viewMode === 0) {
      return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start";
    } else if (viewMode === 1) {
      return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start";
    }
    return "grid grid-cols-1 sm:grid-cols-2 gap-4 items-start";
  }, [isMobile, viewMode]);

  const isListView = useMemo(() => {
    return (isMobile && viewMode === 1) || (!isMobile && viewMode === 2);
  }, [isMobile, viewMode]);

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
        <div className="p-6 max-w-md mx-auto">
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
          <button
            onClick={() => refetch()}
            className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition"
            type="button"
          >
            تلاش مجدد
          </button>
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
        {/* هدر */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            خدمات ({items.length})
          </h1>
          <button
            onClick={handleChangeMode}
            aria-label="تغییر حالت نمایش"
            className="rounded-xl p-3 bg-white shadow transition 
                       hover:bg-gray-100 hover:shadow-md cursor-pointer"
            type="button"
          >
            <Icon
              icon={modeIcons[viewMode]}
              className="text-xl text-slate-600"
            />
          </button>
        </div>
        {/* لیست کارت‌ها */}
        <div className={gridClass}>
          {items.map((item, index) => (
            <React.Fragment key={item.id}>
              <CardItem
                item={item}
                index={isListView ? index : undefined}
                isListView={isListView}
                onClick={() => handleNavigate(item.link)}
              />
              {isListView && index !== items.length - 1 && (
                <div className="border-b border-dashed border-gray-200 mx-4" />
              )}
            </React.Fragment>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LandingContent;
