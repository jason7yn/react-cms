import axios from "axios";
import AES from "crypto-js/aes";
import { message } from "antd";
import { CourseDetailRequest, CourseRequest } from "./models/courses";

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
      1.1 fullfilled promise -> return res.data
      1.2 rejected promise -> return {code,msg}  
    2. handle response
      2.1 code == 200 -> return response 
      2.2 code !==200 -> alert error message - > return response
*/
type AxiosRequest = (url:string,payload:{})=>Promise<T>;
function reqHandler(apiRequest:AxiosRequest, url:string, payload?:any, showMessage?:boolean) {
  return apiRequest(url, payload)
    .then(res => res.data)
    .catch(error => handleError(error))
    .then(res => resHandler(res, showMessage));
}
function handleError(error) {
  const msg = error.response.data.msg;
  const code = error.response.status;

  return { code, msg };
}

function resHandler(res, showMessage = false) {
  //fullfilled promise object, value:{code,msg,data:{}}
  //rejected promise object, value:{code,msg}
  const { code, msg } = res;
  let isError = !(
    code.toString().startsWith("2") || code.toString().startsWith("3")
  );
  if (isError) {
    message.error(msg);
    return res;
  }
  if (!isError && showMessage) {
    message.success(msg);
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
    return reqHandler(httpService.post, "students", param, true);
  },

  updateStudent(param) {
    return reqHandler(httpService.put, "students", param, true);
  },

  deleteStudent(url:string) {
    return reqHandler(httpService.delete, url, undefined, true);
  },
  getStudent(param) {
    return reqHandler(httpService.get, "students", { params: param });
  },
  getStudentById(id:string|string[]) {
    return reqHandler(httpService.get, `students/${id}`);
  },
  getCourse(param:CourseRequest){
    return reqHandler(httpService.get,"courses",{params:param})
  },
  getCourseById(param:CourseDetailRequest){
    return reqHandler(httpService.get,'courses/detail',{params:param});
  }
};
export default apiService;
