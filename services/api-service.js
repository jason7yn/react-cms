import axios from "axios";
import AES from "crypto-js/aes";
import { reject } from "lodash";

const httpService = axios.create({
  baseURL: "https://cms.chtoma.com/api/",
});

httpService.interceptors.request.use(function (config) {
  if (localStorage.getItem("user")) {
    let token = JSON.parse(localStorage.getItem("user")).token;
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

const apiService = {
  login(param) {
    return httpService
      .post("login", {
        ...param,
        password: AES.encrypt(param.password, "cms").toString(),
      })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        reject(error);
      });
  },
  logout() {
    return httpService
      .post("logout", {})
      .then(() => {
        resolve();
      })
      .catch((error) => {
        reject(error);
      });
  },
  addStudent(param) {
    return httpService
      .post("students", param)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        reject(error);
      });
  },
  updateStudent(param) {
    return httpService
      .put("students", param)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        reject(error);
      });
  },
  deleteStudent(url) {
    return httpService
      .delete(url)
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        reject(error);
      });
  },
  getStudent(param) {
    return httpService
      .get("students", { params: param })
      .then((res) => {
        return res.data;
      })
      .catch((error) => {
        reject(error);
      });
  },
};
export default apiService;
