import { Outlet, useNavigate } from "react-router-dom";
import { Layout, Button } from "antd";
import { Icon } from "@iconify/react";

const { Header, Content, Footer } = Layout;

function ReportLayout() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate("/dargah/dashboard2/");
  };

  return (
    <Layout className="h-screen bg-gray-100 font-sans">
      <Header className="!bg-white shadow-md px-8 flex items-center justify-between">
        <h1 className="text-xl font-bold text-gray-800">سامانه گزارش فساد</h1>
        <Button
          className="!bg-[#00598A] duration-300 hover:!duration-300 hover:!bg-[#004c8a] !p-4 "
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

      <Content className="py-10 px-4">
        <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg px-6 py-8">
          <Outlet />
        </div>
      </Content>

      <Footer className="text-center  text-gray-400 text-sm"></Footer>
    </Layout>
  );
}

export default ReportLayout;
