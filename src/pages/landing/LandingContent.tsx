import { useQuery } from "@tanstack/react-query";
import { Button } from "antd";
import { useNavigate } from "react-router-dom";
import { staticCardApi } from "../../service/staticApi";

function LandingContent() {
  const navigate = useNavigate();
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["users"],
    queryFn: staticCardApi,
  });

  const items = data || [];

  return (
    <div className="w-full h-full px-2 sm:px-4 md:px-6">
      <div className="grid grid-cols-2 sm:grid-cols-1 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-4">
        {items.map((item) => (
          <Button
            key={item.id}
            onClick={() => navigate(item.link)}
            type="text"
            className={`!p-4 w-full flex flex-col space-y-3 items-center justify-center border-none text-black rounded-lg hover:shadow-lg transition-shadow duration-300 overflow-hidden break-words ${
              item.id === 5 ? "hidden sm:flex" : ""
            }`}
            style={{ minHeight: "200px" }} // ارتفاع حداقلی برای یکنواختی کارت‌ها
          >
            <div className="mb-2 text-4xl">
              <img
                src={item.img}
                alt={item.title}
                className="max-h-16 sm:max-h-20 object-contain"
              />
            </div>
            <span className="text-base sm:text-lg font-semibold max-w-full text-center">
              {item.title}
            </span>
            <span className="text-xs sm:text-sm text-gray-600 max-w-full text-center break-words whitespace-normal">
              {item.description}
            </span>
          </Button>
        ))}
      </div>
    </div>
  );
}

export default LandingContent;
