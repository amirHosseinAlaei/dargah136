import axios from "axios";

const staticApi = axios.create({
  baseURL: "http://localhost:3001",
});

export function staticCardApi() {
  return staticApi.get("/services")
    .then(response => response.data);
}


