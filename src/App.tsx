import { RouterProvider } from "react-router-dom";
import routes from "./Routes/routes";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import AccessibilityWidget from "./utils/Accessibility";

// اضافه کردن ابزار دسترس‌پذیری

const queryClient = new QueryClient();

function App() {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorInfo: "var(--blue)",
          fontFamily: "IRANYekanXFaNum",
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <>
          <Toaster />
          <AccessibilityWidget />
          <RouterProvider router={routes} />
        </>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
