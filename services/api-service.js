import axios from "axios";
import AES from "crypto-js/aes";
import { message } from "antd";

const httpService = axios.create({
  baseURL: "https://cms.chtoma.com/api/"
});

httpService.interceptors.request.use(function(config) {
  if (localStorage.getItem("user")) {
    let token = JSON.parse(localStorage.getItem("user")).token;
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});
/*
  action: process http request
    1. launch api request(methods: get,post,delete....)
    2. handle response
      2.1 success response -> return response data
      2.2 unsuccess response -> return error code
*/

//if error callback is specified in then block, catch block will be not executed
//if response is a reject promise object and both error callback in then block
//and error callback in error block only return a error message instead of
//explicitly return a reject promise object
//the return value will be a resolved promise object with error message
function reqHandler(apiRequest, url, payload) {
  return apiRequest(url, payload).then(
    res => res.data,
    error => handleError(error)
  );
  // .catch(error => handleError(error)); //error message
}
function handleError(error) {
  const msg = error.response.data.msg;
  const code = error.response.status;

  return { code, msg };
}
function resHandler(res) {
  const { code, msg } = res;

  if (!(code.toString().startsWith("2") || code.toString().startsWith("3"))) {
    message.error(msg);
  }
  return res;
}

const apiService = {
  login(param) {
    return reqHandler(httpService.post, "login", {
      ...param,
      password: AES.encrypt(param.password, "cms").toString()
    });
  },
  logout() {
    return reqHandler(httpService.post, "logout");
  },

  addStudent(param) {
    return reqHandler(httpService.post, "students", param);
  },

  updateStudent(param) {
    return reqHandler(httpService.put, "students", param).then(resHandler);
  },

  deleteStudent(url) {
    return reqHandler(httpService.delete, url);
  },
  getStudent(param) {
    return reqHandler(httpService.get, "students", { params: param });
  }
};
export default apiService;
