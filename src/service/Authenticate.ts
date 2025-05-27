import axios from 'axios';

export const CreateCaptcha = async () => {
  const { data } = await axios.get(
    'https://api.bazresi.ir/api/v1/Authenticate/CreateExternalCaptcha',
    {
      params: {
        BackColor: '#fafafa',
        FontSize: 16,
        ForeColor: '#000',
      },
    }
  );

  return {
    captchaKey: data.dntCaptchaId,
    imageData: data.dntCaptchaImage,
  };
};

// export const LoginExternal = async ({ nationalCode, password, captcha, captchaKey }) => {
//   const { data } = await axios.post(
//     'https://api.bazresi.ir/api/v1/Authenticate/LoginExternal',
//     {
//       userName: nationalCode,
//       password,
//       dntCaptchaText: captcha,
//       dntCaptchaId: captchaKey,
//       dntCaptchaToken: captchaKey,
//     }
//   );

//   return data;
// };
