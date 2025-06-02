import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Button } from "antd";
import { Icon } from "@iconify/react";

const { Header, Content } = Layout;

function FollowUpLayout() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dargah/dashboard2/");
  };

  return (
    <Layout className="h-screen font-sans !bg-gray-100">
      <Header
        className="!bg-white shadow-md px-4 lg:px-8 flex items-center justify-between"
        style={{ height: 64 }}
      >
        <h1 className="text-base lg:text-xl font-bold text-gray-800">
          سامانه پیگیری گزارش فساد
        </h1>
        <Button
          className="!bg-[#00598A] hover:!bg-[#004466] lg:!p-5 lg:!font-bold"
          type="primary"
          onClick={handleBack}
        >
          بازگشت به داشبورد
          <Icon
            icon="mdi:arrow-left"
            style={{ marginLeft: 8, fontSize: "16px" }}
          />
        </Button>
      </Header>

      <Content
        className="py-6 px-4 flex justify-center overflow-auto"
        style={{ height: "calc(100vh - 64px)" }}
      >
        <div className="w-full max-w-3xl p-6 sm:p-8 md:p-10 h-full max-h-full flex flex-col overflow-hidden">
          <Outlet />
        </div>
      </Content>
    </Layout>
  );
}

export default FollowUpLayout;
