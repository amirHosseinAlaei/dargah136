import React, { useState, useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import routes from "./Routes/routes";
import { Toaster } from "react-hot-toast";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ConfigProvider } from "antd";
import AccessibilityWidget from "./utils/Accessibility";

const queryClient = new QueryClient();

function App() {
  const [fontSize, setFontSize] = useState(() => {
    const saved = localStorage.getItem("fontSize");
    return saved ? parseInt(saved, 10) : 16;
  });

  useEffect(() => {
    localStorage.setItem("fontSize", fontSize);
    document.documentElement.style.setProperty("font-size", fontSize + "px", "important");
  }, [fontSize]);

  return (
    <ConfigProvider
      theme={{
        token: {
          colorInfo: "var(--blue)",
          fontFamily: "IRANYekanXFaNum",
          fontSize: fontSize,
        },
      }}
    >
      <QueryClientProvider client={queryClient}>
        <div>
          <Toaster />
          <AccessibilityWidget fontSize={fontSize} setFontSize={setFontSize} />
          <RouterProvider router={routes} />
        </div>
      </QueryClientProvider>
    </ConfigProvider>
  );
}

export default App;
