import api from "./Api_Url";

export const showCaptcha = async () => {
  try {
    const response = await api.get("/Authenticate/CreateExternalCaptcha", {
      params: {
        BackColor: "ffffff",
        ForeColor: "000000",
        FontSize: 20,
      },
    });
    // داده‌های کپچا که از API میاد رو اینجا به شکل مناسب تبدیل کن
    return {
      dntCaptchaId: response.data.dntCaptchaId,
      captchaImageUrl: `data:image/png;base64,${response.data.dntCaptchaImage}`,
      dntCaptchaText: response.data.dntCaptchaText,
      dntCaptchaToken: response.data.dntCaptchaToken,
    };
  } catch (error) {
    console.error("خطا در دریافت کپچا:", error);
    throw error;
  }
};
