import http from "../http-common";

class PostDataService {
  getAll() {
    return http.get("/posts");
  }

  get(id) {
    return http.get("/posts/"+id);
  }

  create(data) {
    return http.post("/posts", data,{headers:{
      "Content-Type": "multipart/form-data",
    }});
  }

  update(id, data) {
    return http.put(`/posts/${id}`, data,{headers:{
      "Content-Type": "multipart/form-data",
    }});
  }

  delete(id) {
    return http.delete(`/posts/${id}`);
  }

  deleteAll() {
    return http.delete(`/posts`);
  }

  getByCargo(cargo) {
    return http.get(`/posts/search?cargo=${cargo}`);
  }
  getByQty(qty) {
    return http.get(`/posts/qty?qty=${qty}`);
  }
}

export default new PostDataService();