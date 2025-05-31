import { Outlet } from "react-router-dom";
import { Layout } from "antd";
const { Content } = Layout;

function ReportLayout() {
  return (
    <Layout className=" bg-gray-50 font-sans">
      <Content className="flex flex-col items-center justify-center px-8 py-16">
        {/* Container اصلی فرم */}
        <div
          className="
            rounded-xl 
            w-full 
            p-4
            transition-shadow
            duration-300
          "
        >
          <h1 className="text-3xl font-semibold text-gray-900 mb-6 text-center">
            فرم گزارش
          </h1>

          <Outlet />

      
        </div>
      </Content>
    </Layout>
  );
}

export default ReportLayout;
