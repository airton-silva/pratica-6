import http from "../http-common";

class CommentDataService {
  getAll() {
    return http.get("/comments");
  }

  get(id) {
    return http.get(`/comments/${id}`);
  }

  getAuth(data) {
      return http.post("comments/auth",data)
  }

  create(data) {
    return http.post("/comments", data,{headers:{
      "Content-Type": "multipart/form-data",
    }});
  }

  update(id, data) {
    return http.put(`/comments/${id}`, data,{headers:{
      "Content-Type": "multipart/form-data",
    }});
  }

  delete(id) {
    return http.delete(`/comments/${id}`);
  }

  deleteAll() {
    return http.delete(`/comments`);
  }

}

export default new CommentDataService();