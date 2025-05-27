import React, { useRef } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { Form, Input, Button, Typography, Row, Col, Divider, Grid, Tooltip, message } from 'antd';
import { ReloadOutlined } from '@ant-design/icons';
import { CreateCaptcha } from '../../service/Authenticate';

const { Title, Text, Link } = Typography;
const { useBreakpoint } = Grid;

function Login({ onRegister, onForgotPassword, onChangePhone }) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const queryClient = useQueryClient();

  // گرفتن کپچا
  const { data: captchaData, isLoading, isFetching } = useQuery({
    queryKey: ['captcha'],
    queryFn: CreateCaptcha,
    refetchOnWindowFocus: false,
  });

  const captchaKeyRef = useRef();
  captchaKeyRef.current = captchaData?.captchaKey;

  const handleRefreshCaptcha = () => {
    queryClient.invalidateQueries({ queryKey: ['captcha'] });
  };

  const captchaImgSrc = captchaData?.imageData
    ? `data:image/png;base64,${captchaData.imageData}`
    : '';

  // هندل ارسال فرم
  const handleFinish = async (values) => {
    try {
      const loginResult = await LoginExternal({
        nationalCode: values.nationalCode,
        password: values.password,
        captcha: values.captcha,
        captchaKey: captchaKeyRef.current,
      });
      message.success('ورود موفقیت‌آمیز بود!');
      console.log('Login result:', loginResult);
      // اینجا می‌تونی ریدایرکت کنی یا توکن ذخیره کنی
    } catch (error) {
      message.error('خطا در ورود: ' + (error.response?.data?.message || error.message));
      handleRefreshCaptcha(); // کپچا را رفرش کن در صورت خطا
    }
  };

  return (
    <div
      dir="rtl"
      className={`bg-white rounded-2xl shadow-lg mx-auto ${
        isMobile ? 'p-4 w-full' : 'p-12 w-[60vw] max-w-[600px] min-w-[350px]'
      }`}
    >
      <Row
        justify="center"
        align="middle"
        className={`${isMobile ? 'min-h-[300px]' : 'min-h-[400px]'}`}
        wrap={true}
      >
        {/* لوگو و متن */}
        <Col
          xs={24}
          md={10}
          className={`flex flex-col items-center justify-center text-center ${
            isMobile ? 'py-5' : 'pl-8'
          }`}
        >
          <img
            src="https://136.bazresi.ir/dargah/assets/img/logo.e711fe7c.svg"
            alt="لوگو"
            className={`mb-6 object-contain ${isMobile ? 'w-20' : 'w-36'}`}
          />
          <Text
            className="block mb-2"
            style={{ color: '#00365a', fontSize: isMobile ? 16 : 20 }}
          >
            درگاه سامانه یکپارچه
          </Text>
          <Text
            className={`${isMobile ? 'hidden' : 'block'}`}
            style={{ color: '#00365a', fontSize: 18 }}
          >
            سازمان بازرسی کل کشور
          </Text>
          <Title
            level={3}
            className="font-bold mt-8"
            style={{ color: '#00365a', fontSize: isMobile ? 20 : 32 }}
          >
            www.136.ir
          </Title>
        </Col>

        {/* جداکننده فقط دسکتاپ */}
        {!isMobile && (
          <Col md={1} className="flex justify-center">
            <Divider
              type="vertical"
              style={{ height: 220, minHeight: 200, borderInlineStart: '2px solid #eee' }}
            />
          </Col>
        )}

        {/* جداکننده فقط موبایل */}
        {isMobile && (
          <Col xs={24}>
            <Divider className="my-4" />
          </Col>
        )}

        {/* فرم ورود */}
        <Col
          xs={24}
          md={13}
          className={`flex flex-col justify-center flex-grow ${
            isMobile ? 'min-h-[180px]' : 'min-h-[500px] pr-12'
          }`}
        >
          <div className="max-w-[500px] mx-auto w-full">
            <Form
              name="login"
              layout="vertical"
              onFinish={handleFinish}
              className="w-full"
            >
              <Form.Item
                label={<span className={`${isMobile ? 'text-base' : 'text-lg'}`}>کد ملی</span>}
                name="nationalCode"
                rules={[
                  { required: true, message: 'کد ملی را وارد کنید!' },
                  { pattern: /^\d{10}$/, message: 'کد ملی باید ۱۰ رقم باشد.' },
                ]}
              >
                <Input
                  placeholder="کد ملی"
                  size="large"
                  className={`${isMobile ? 'text-base py-2' : 'text-lg py-3'}`}
                />
              </Form.Item>
              <Form.Item
                label={<span className={`${isMobile ? 'text-base' : 'text-lg'}`}>رمز عبور</span>}
                name="password"
                rules={[{ required: true, message: 'رمز عبور را وارد کنید!' }]}
              >
                <Input.Password
                  placeholder="رمز عبور"
                  size="large"
                  className={`${isMobile ? 'text-base py-2' : 'text-lg py-3'}`}
                />
              </Form.Item>

              {/* کپچا */}
              <Form.Item
                label={<span className={`${isMobile ? 'text-base' : 'text-lg'}`}>کد امنیتی</span>}
                required
                style={{ marginBottom: 16 }}
              >
                <Row gutter={8} align="middle" wrap={false}>
                  <Col flex="90px">
                    {isLoading || isFetching ? (
                      <div
                        style={{
                          width: 90,
                          height: 32,
                          background: '#eee',
                          borderRadius: 8,
                        }}
                      />
                    ) : (
                      <img
                        src={captchaImgSrc}
                        alt="کپچا"
                        style={{
                          borderRadius: 8,
                          border: '1px solid #ccc',
                          width: 90,
                          height: 32,
                          objectFit: 'cover',
                          verticalAlign: 'middle',
                        }}
                      />
                    )}
                  </Col>
                  <Col flex="32px">
                    <Tooltip title="بارگذاری مجدد کپچا">
                      <Button
                        type="text"
                        icon={<ReloadOutlined />}
                        onClick={handleRefreshCaptcha}
                        style={{ padding: 0, marginRight: 4 }}
                        tabIndex={-1}
                        aria-label="رفرش کپچا"
                        loading={isFetching}
                      />
                    </Tooltip>
                  </Col>
                  <Col flex="auto">
                    <Form.Item
                      name="captcha"
                      noStyle
                      rules={[{ required: true, message: 'کد امنیتی را وارد کنید!' }]}
                    >
                      <Input
                        placeholder="کد امنیتی"
                        size="large"
                        maxLength={6}
                        className={`${isMobile ? 'text-base py-2' : 'text-lg py-3'}`}
                        autoComplete="off"
                        style={{ direction: 'ltr', textAlign: 'center' }}
                      />
                    </Form.Item>
                  </Col>
                </Row>
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  size="large"
                  block
                  className={`font-bold ${isMobile ? 'text-base py-2' : 'text-xl py-3'}`}
                >
                  ورود
                </Button>
              </Form.Item>
            </Form>

            <Button
              type="default"
              block
              size="large"
              className={`mb-6 font-bold ${isMobile ? 'text-sm' : 'text-lg'}`}
              onClick={onRegister}
            >
              ثبت نام شهروند
            </Button>

            <Row justify="space-between">
              <Col>
                <Link
                  className={`${isMobile ? 'text-sm' : 'text-base'}`}
                  onClick={onForgotPassword}
                >
                  فراموشی رمز
                </Link>
              </Col>
              <Col>
                <Link
                  className={`${isMobile ? 'text-sm' : 'text-base'}`}
                  onClick={onChangePhone}
                >
                  تغییر شماره تلفن
                </Link>
              </Col>
            </Row>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default Login;
