  import React, { useState } from "react";
  import { useQuery } from "@tanstack/react-query";
  import { Button } from "antd";
  import { useNavigate } from "react-router-dom";
  import { Icon } from "@iconify/react";
  import { staticCardApi } from "../../service/staticApi";

  // هوک ساده بدون useEffect
  function useIsMobile() {
    // فقط یک بار بررسی می‌شود (در هر رندر)
    return typeof window !== "undefined" && window.innerWidth < 640;
  }

  function LandingContent() {
    const navigate = useNavigate();
    const {
      data,
      isLoading,
      isError,
      error,
      refetch,
    } = useQuery({
      queryKey: ["users"],
      queryFn: staticCardApi,
    });

    const isMobile = useIsMobile();

    const modeCount = isMobile ? 2 : 3;
    const [viewMode, setViewMode] = useState(0);

    const modeIcons = isMobile
      ? ["mdi:view-grid-outline", "mdi:view-list"]
      : [
          "mdi:view-grid-outline",
          "mdi:view-grid-plus-outline",
          "mdi:view-list",
        ];

    const handleChangeMode = () => setViewMode((prev) => (prev + 1) % modeCount);

    if (isLoading) return <div className="text-center py-8">در حال بارگذاری...</div>;
    if (isError)
      return (
        <div className="text-center py-8 text-red-500 flex flex-col gap-4 items-center">
          <span>خطا: {error.message}</span>
          <Button onClick={() => refetch()} type="primary">
            تلاش مجدد
          </Button>
        </div>
      );

    const items = data || [];

    if (!items.length)
      return <div className="text-center py-8 text-gray-500">داده‌ای یافت نشد.</div>;

    let gridClass = "";
    if (isMobile) {
      gridClass = viewMode === 1
        ? "flex flex-col gap-2"
        : "grid grid-cols-1 gap-4";
    } else {
      if (viewMode === 2) gridClass = "flex flex-col gap-2";
      else if (viewMode === 1) gridClass = "grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4";
      else gridClass = "grid grid-cols-1 sm:grid-cols-2 gap-4";
    }

    return (
      <div className="w-full h-full px-2 sm:px-4 md:px-6">
        <div className="mb-4 flex items-center justify-end">
          <Button 
            onClick={handleChangeMode}
            type="primary"
            aria-label="تغییر حالت نمایش"
            className="!px-4 !bg-[#245794] !py-2 rounded-lg flex items-center justify-center"
          >
            <Icon   icon={modeIcons[viewMode]} className="text-xl" />
          </Button>
        </div>
        {((isMobile && viewMode === 1) || (!isMobile && viewMode === 2)) ? (
          <div className="flex flex-col">
            {items.map((item, idx) => (
              <React.Fragment key={item.id}>
                <Button
                  onClick={() => navigate(item.link)}
                  type="text"
                  className="w-full flex flex-row items-center border-none text-black rounded-lg hover:shadow transition duration-300 p-2 bg-white"
                  style={{ minHeight: "70px" }}
                  aria-label={`رفتن به ${item.title}`}
                >
                  <span className="text-gray-500 font-bold w-6 text-center">{idx + 1}</span>
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="max-h-12 object-contain mx-2"
                    style={{ width: 50, height: 50 }}
                  />
                  <span className="text-sm sm:text-base text-gray-700 text-right flex-1 break-words whitespace-normal">
                    {item.description}
                  </span>
                </Button>
                {idx !== items.length - 1 && (
                  <div className="border-b border-dashed border-gray-400 mx-2" />
                )}
              </React.Fragment>
            ))}
          </div>
        ) : (
          <div className={gridClass}>
            {items.map((item) => (
              <Button
                key={item.id}
                onClick={() => navigate(item.link)}
                type="text"
                className="!p-4 w-full flex flex-col space-y-3 items-center justify-center border-none text-black rounded-lg hover:shadow-lg transition-shadow duration-300 overflow-hidden break-words"
                style={{ minHeight: "200px" }}
                aria-label={`رفتن به ${item.title}`}
              >
                <div className="mb-2 text-4xl">
                  <img
                    src={item.img}
                    alt={item.title}
                    loading="lazy"
                    className="max-h-16 sm:max-h-20 object-contain"
                  />
                </div>
                <span className="text-base sm:text-lg font-semibold max-w-full text-center break-words whitespace-normal">
                  {item.title}
                </span>
                <span className="text-xs sm:text-sm text-gray-600 max-w-full text-center break-words whitespace-normal">
                  {item.description}
                </span>
              </Button>
            ))}
          </div>
        )}
      </div>
    );
  }

  export default LandingContent;
