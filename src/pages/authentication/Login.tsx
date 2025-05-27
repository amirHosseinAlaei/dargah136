import React, { useRef, useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import {
  Form, Input, Button, Typography, Row, Col, Divider, Grid, Tooltip, message, Card, Space,
} from 'antd';
import { ReloadOutlined, UserOutlined, LockOutlined, SafetyOutlined } from '@ant-design/icons';
import { CreateCaptcha } from '../../service/Authenticate';

const { Title, Text, Link } = Typography;
const { useBreakpoint } = Grid;

function Login({ onRegister, onForgotPassword, onChangePhone }) {
  const screens = useBreakpoint();
  const isMobile = !screens.md;
  const isTablet = screens.md && !screens.lg;
  const queryClient = useQueryClient();
  const [isSubmitting, setIsSubmitting] = useState(false);

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
    setIsSubmitting(true);
    try {
      const loginResult = await LoginExternal({
        nationalCode: values.nationalCode,
        password: values.password,
        captcha: values.captcha,
        captchaKey: captchaKeyRef.current,
      });
      message.success('ورود موفقیت‌آمیز بود!');
      // اینجا می‌تونی ریدایرکت کنی یا توکن ذخیره کنی
    } catch (error) {
      message.error('خطا در ورود: ' + (error.response?.data?.message || error.message));
      handleRefreshCaptcha(); // کپچا را رفرش کن در صورت خطا
    } finally {
      setIsSubmitting(false);
    }
  };

  // استایل‌های بهبود یافته
  const containerStyle = {
    minHeight: '100vh',
    background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    padding: isMobile ? '8vw 2vw' : '40px',
    fontFamily: 'Vazirmatn, IRANSans, Tahoma, Arial, sans-serif',
  };

  const cardStyle = {
    width: '100%',
    maxWidth: isMobile ? '98vw' : isTablet ? '700px' : '900px',
    borderRadius: '28px',
    boxShadow: '0 12px 48px rgba(80, 60, 120, 0.12)',
    overflow: 'hidden',
    border: 'none',
    direction: 'rtl',
    background: '#fff',
  };

  const logoSectionStyle = {
    background: 'linear-gradient(135deg, #00365a 0%, #004c7a 100%)',
    padding: isMobile ? '32px 10px' : '60px 32px',
    textAlign: 'center',
    color: 'white',
    position: 'relative',
    minHeight: isMobile ? 180 : 300,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
  };

  const formSectionStyle = {
    padding: isMobile ? '28px 8px' : '50px 40px',
    background: '#f9f9fb',
    minHeight: isMobile ? 320 : 400,
  };

  return (
    <div dir="rtl" style={containerStyle}>
      <Card style={cardStyle} bodyStyle={{ padding: 0 }}>
        <Row style={{ minHeight: isMobile ? 'auto' : '600px' }}>
          {/* بخش لوگو و اطلاعات */}
          <Col xs={24} lg={10} style={{ borderLeft: isMobile ? 'none' : '1px solid #f2f2f2', background: '#00365a' }}>
            <div style={logoSectionStyle}>
              <img
                src="https://136.bazresi.ir/dargah/assets/img/logo.e711fe7c.svg"
                alt="لوگو"
                style={{
                  width: isMobile ? '70px' : '110px',
                  height: 'auto',
                  marginBottom: '24px',
                  filter: 'brightness(0) invert(1)',
                }}
              />
              <Title
                level={isMobile ? 4 : 2}
                style={{
                  color: 'white',
                  marginBottom: '10px',
                  fontWeight: 'bold',
                  letterSpacing: '.5px',
                }}
              >
                درگاه سامانه یکپارچه
              </Title>
              <Text
                style={{
                  color: 'rgba(255, 255, 255, 0.93)',
                  fontSize: isMobile ? '13px' : '16px',
                  display: 'block',
                  marginBottom: '8px',
                }}
              >
                سازمان بازرسی کل کشور
              </Text>
              <div
                style={{
                  background: 'rgba(255, 255, 255, 0.13)',
                  padding: '12px 18px',
                  borderRadius: '40px',
                  marginTop: '26px',
                  display: 'inline-block',
                  fontWeight: 'bold',
                  fontSize: isMobile ? '15px' : '18px',
                  letterSpacing: '.7px',
                  boxShadow: '0 2px 10px rgba(0,0,0,0.07)',
                }}
              >
                www.136.ir
              </div>
            </div>
          </Col>
          {/* بخش فرم ورود */}
          <Col xs={24} lg={14}>
            <div style={formSectionStyle}>
              <div style={{ maxWidth: '410px', margin: '0 auto' }}>
                <Title
                  level={isMobile ? 3 : 2}
                  style={{
                    color: '#00365a',
                    textAlign: 'center',
                    marginBottom: '32px',
                    fontWeight: 'bold',
                  }}
                >
                  ورود به سامانه
                </Title>
                <Form
                  name="login"
                  layout="vertical"
                  onFinish={handleFinish}
                  size="large"
                  autoComplete="off"
                >
                  <Form.Item
                    name="nationalCode"
                    rules={[
                      { required: true, message: 'کد ملی را وارد کنید!' },
                      { pattern: /^\d{10}$/, message: 'کد ملی باید ۱۰ رقم باشد.' },
                    ]}
                  >
                    <Input
                      prefix={<UserOutlined style={{ color: '#00365a' }} />}
                      placeholder="کد ملی"
                      style={{
                        borderRadius: '10px',
                        border: '1.5px solid #e0e0e0',
                        padding: '10px 14px',
                        fontSize: '16px',
                        background: '#fff',
                        boxShadow: 'none',
                        transition: 'all 0.3s',
                      }}
                    />
                  </Form.Item>
                  <Form.Item
                    name="password"
                    rules={[{ required: true, message: 'رمز عبور را وارد کنید!' }]}
                  >
                    <Input.Password
                      prefix={<LockOutlined style={{ color: '#00365a' }} />}
                      placeholder="رمز عبور"
                      style={{
                        borderRadius: '10px',
                        border: '1.5px solid #e0e0e0',
                        padding: '10px 14px',
                        fontSize: '16px',
                        background: '#fff',
                        boxShadow: 'none',
                        transition: 'all 0.3s',
                      }}
                    />
                  </Form.Item>
                  {/* کپچا */}
                  <Form.Item style={{ marginBottom: '20px' }}>
                    <Space.Compact style={{ width: '100%' }}>
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '10px',
                          padding: '9px 12px',
                          border: '1.5px solid #e0e0e0',
                          borderRadius: '10px 0 0 10px',
                          background: '#f4f6fa',
                          minWidth: '120px',
                        }}
                      >
                        {isLoading || isFetching ? (
                          <div
                            style={{
                              width: '85px',
                              height: '35px',
                              background: '#e0e0e0',
                              borderRadius: '8px',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                            }}
                          >
                            <Text style={{ color: '#999', fontSize: 12 }}>در حال بارگذاری…</Text>
                          </div>
                        ) : (
                          <img
                            src={captchaImgSrc}
                            alt="کپچا"
                            style={{
                              borderRadius: '6px',
                              border: '1px solid #dde',
                              width: '85px',
                              height: '35px',
                              objectFit: 'cover',
                            }}
                          />
                        )}
                        <Tooltip title="بارگذاری مجدد کپچا">
                          <Button
                            type="text"
                            icon={<ReloadOutlined />}
                            onClick={handleRefreshCaptcha}
                            loading={isFetching}
                            style={{
                              color: '#00365a',
                              border: 'none',
                              boxShadow: 'none',
                              fontSize: 17,
                            }}
                          />
                        </Tooltip>
                      </div>
                      <Form.Item
                        name="captcha"
                        noStyle
                        rules={[{ required: true, message: 'کد امنیتی را وارد کنید!' }]}
                      >
                        <Input
                          prefix={<SafetyOutlined style={{ color: '#00365a' }} />}
                          placeholder="کد امنیتی"
                          maxLength={6}
                          autoComplete="off"
                          style={{
                            borderRadius: '0 10px 10px 0',
                            border: '1.5px solid #e0e0e0',
                            borderLeft: 'none',
                            padding: '10px 14px',
                            fontSize: '16px',
                            direction: 'ltr',
                            textAlign: 'center',
                            background: '#fff',
                            transition: 'all 0.3s',
                          }}
                        />
                      </Form.Item>
                    </Space.Compact>
                  </Form.Item>
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      block
                      loading={isSubmitting}
                      style={{
                        background: 'linear-gradient(135deg, #00365a 0%, #004c7a 100%)',
                        border: 'none',
                        borderRadius: '10px',
                        height: '48px',
                        fontSize: '16px',
                        fontWeight: 'bold',
                        boxShadow: '0 2px 10px rgba(0, 54, 90, 0.14)',
                        transition: 'all 0.3s ease',
                      }}
                    >
                      ورود به سامانه
                    </Button>
                  </Form.Item>
                </Form>
                <Divider style={{ margin: '22px 0', color: '#bbb' }}>یا</Divider>
                <Button
                  block
                  onClick={onRegister}
                  style={{
                    borderRadius: '10px',
                    height: '48px',
                    fontSize: '16px',
                    fontWeight: 'bold',
                    border: '1.5px solid #00365a',
                    color: '#00365a',
                    background: 'transparent',
                    marginBottom: '20px',
                  }}
                >
                  ثبت نام شهروند
                </Button>
                <Row justify="space-between" align="middle">
                  <Col>
                    <Link
                      onClick={onForgotPassword}
                      style={{
                        color: '#00365a',
                        fontSize: '14px',
                        fontWeight: '500',
                        textDecoration: 'none',
                      }}
                    >
                      فراموشی رمز عبور
                    </Link>
                  </Col>
                  <Col>
                    <Link
                      onClick={onChangePhone}
                      style={{
                        color: '#00365a',
                        fontSize: '14px',
                        fontWeight: '500',
                        textDecoration: 'none',
                      }}
                    >
                      تغییر شماره تلفن
                    </Link>
                  </Col>
                </Row>
              </div>
            </div>
          </Col>
        </Row>
      </Card>
    </div>
  );
}

export default Login;
