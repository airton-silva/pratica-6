import http from "../http-common";

class UserDataService {
  getAll() {
    return http.get("/users");
  }

  get(id) {
    return http.get(`/users/${id}`);
  }

  getAuth(data) {
      return http.post("users/auth",data)
  }

  create(data) {
    return http.post("/users", data,{headers:{
      "Content-Type": "multipart/form-data",
    }});
  }

  update(id, data) {
    return http.put(`/users/${id}`, data,{headers:{
      "Content-Type": "multipart/form-data",
    }});
  }

  delete(id) {
    return http.delete(`/users/${id}`);
  }

  deleteAll() {
    return http.delete(`/users`);
  }

}

export default new UserDataService();