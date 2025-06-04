import React, { useState, useEffect, useMemo, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import { Icon } from "@iconify/react";
import { staticCardApi } from "../../service/staticApi";

// Type for Card Item
export interface CardItemType {
  id: string | number;
  title: string;
  description: string;
  img: string;
  link: string;
}

// Hook: Detect mobile screen
function useIsMobile(): boolean {
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

// Card: Single service card (list/grid)
const ServiceCard: React.FC<{
  item: CardItemType;
  index?: number;
  isListView: boolean;
  onClick: () => void;
  className?: string;
}> = React.memo(({ item, index, isListView, onClick, className }) => {
  if (isListView) {
    return (
      <button
        onClick={onClick}
        className={`w-full flex flex-row items-start rounded-lg transition-colors duration-150 p-3 hover:bg-gray-50 focus:bg-gray-100 outline-none ${
          className || ""
        }`}
        aria-label={`رفتن به ${item.title}`}
        type="button"
      >
        {typeof index === "number" && (
          <span className="text-gray-900 font-bold w-8 text-center text-sm flex-shrink-0 mt-1">
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
          <div className="text-sm font-bold text-gray-800 mb-1 break-words whitespace-normal leading-relaxed">
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
      className={`p-4 w-full h-auto flex flex-col items-center justify-start rounded-lg transition-colors duration-150 hover:bg-gray-50 focus:bg-gray-100 outline-none ${
        className || ""
      }`}
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
        <h3 className="text-base sm:text-lg font-bold break-words whitespace-normal leading-tight w-full text-gray-800">
          {item.title}
        </h3>
        <p className="text-xs sm:text-sm text-gray-500 break-words whitespace-normal leading-relaxed w-full">
          {item.description}
        </p>
      </div>
    </button>
  );
});
ServiceCard.displayName = "ServiceCard";

// UI: Loading state
const LoadingState: React.FC = () => (
  <p className="text-gray-600">در حال بارگذاری...</p>
);

// UI: Error state
const ErrorState: React.FC<{ errorMessage?: string; onRetry: () => void }> = ({
  onRetry,
}) => (
  <div className="text-center py-12">
    <h3 className="text-lg font-semibold text-red-800 mb-2">خطا در بارگذاری</h3>
    <button
      onClick={onRetry}
      className="px-4 py-2 rounded-lg bg-red-600 text-white text-sm hover:bg-red-700 transition"
      type="button"
    >
      تلاش مجدد
    </button>
  </div>
);

// UI: Empty state
const EmptyState: React.FC = () => (
  <div className="text-center py-12">
    <Icon
      icon="mdi:inbox-outline"
      className="text-gray-400 text-6xl mx-auto mb-4"
    />
    <p className="text-gray-500 text-lg">هیچ داده‌ای یافت نشد</p>
  </div>
);

// Main Component
const LandingContent: React.FC = () => {
  const navigate = useNavigate();
  const isMobile = useIsMobile();

  const {
    data: serviceList,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<CardItemType[], Error>({
    queryKey: ["static-cards"],
    queryFn: staticCardApi,
    staleTime: 5 * 60 * 1000,
    retry: 2,
  });

  // حالت نمایش: grid یا list
  const [viewMode, setViewMode] = useState<number>(0);
  const viewModeCount = isMobile ? 2 : 3;
  const modeIcons = useMemo(
    () =>
      isMobile
        ? ["material-symbols:grid-view-outline", "material-symbols:list"]
        : [
            "material-symbols:grid-view-outline",
            "material-symbols:grid-3x3",
            "material-symbols:list",
          ],
    [isMobile]
  );

  // تغییر حالت نمایش
  const handleToggleViewMode = useCallback(() => {
    setViewMode((prev) => (prev + 1) % viewModeCount);
  }, [viewModeCount]);

  // مسیر‌یابی با شرایط خاص
  const handleCardClick = useCallback(
    (link: string, id?: string | number) => {
      if (id === 5) {
        window.location.href = "tel:136";
      } else if (id === 2) {
        navigate("/dargah/dashboard2/report");
      } else {
        navigate(link);
      }
    },
    [navigate]
  );

  // کلاس‌بندی حالت نمایش
  const isListView =
    (isMobile && viewMode === 1) || (!isMobile && viewMode === 2);

  const layoutClass = useMemo(() => {
    if (isListView) return "flex flex-col gap-1";
    if (isMobile) return "grid grid-cols-1 gap-4";
    if (viewMode === 0)
      return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 items-start";
    if (viewMode === 1)
      return "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 items-start";
    return "grid grid-cols-1 sm:grid-cols-2 gap-4 items-start";
  }, [isMobile, viewMode, isListView]);

  // وضعیت‌های مختلف
  if (isLoading) return <LoadingState />;
  if (isError)
    return <ErrorState errorMessage={error?.message} onRetry={refetch} />;
  if (!serviceList || serviceList.length === 0) return <EmptyState />;

  return (
    <div className="w-full min-h-screen px-2 sm:px-4 md:px-6 py-4">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <h1 className="text-xl sm:text-2xl font-bold text-gray-800">
            خدمات ({serviceList.length})
          </h1>
          <button
            onClick={handleToggleViewMode}
            aria-label="تغییر حالت نمایش"
            className="rounded-xl p-3 bg-white shadow transition hover:bg-gray-100 hover:shadow-md cursor-pointer"
            type="button"
          >
            <Icon
              icon={modeIcons[viewMode]}
              className="text-xl text-slate-600"
            />
          </button>
        </div>

        {/* Services List/Grid */}
        <div className={layoutClass}>
          {serviceList.map((service, idx) => {
            // کارت با id=5 فقط روی موبایل دیده شود
            const mobileOnly = service.id === 5 ? "block lg:hidden" : "";
            return (
              <React.Fragment key={service.id}>
                <ServiceCard
                  item={service}
                  index={isListView ? idx : undefined}
                  isListView={isListView}
                  className={mobileOnly}
                  onClick={() => handleCardClick(service.link, service.id)}
                />
                {isListView && idx !== serviceList.length - 1 && (
                  <div className="border-b border-dashed border-gray-200 mx-4" />
                )}
              </React.Fragment>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default LandingContent;
