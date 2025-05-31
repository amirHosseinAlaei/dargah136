import api from "./Api_Url";

export const showCaptcha = api.get("/Authenticate/LoginWithExternalCaptcha")
  .then(response => {
    return response.data;
  })
  .catch(error => {
    console.log(error  ,"err")
  });
