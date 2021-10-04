import axios from "axios";
import AES from "crypto-js/aes";

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

export default {
  login(param) {
    return new Promise((resolve, reject) => {
      httpService
        .post("login", {
          ...param,
          password: AES.encrypt(param.password, "cms").toString()
        })
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  logout() {
    return new Promise((resolve, reject) => {
      httpService
        .post("logout", {})
        .then(() => {
          resolve();
        })
        .catch(error => {
          reject(error);
        });
    });
  },
  get(url) {
    return new Promise((resolve, reject) => {
      httpService
        .get(url)
        .then(res => {
          resolve(res.data);
        })
        .catch(error => {
          reject(error);
        });
    });
  }
};
