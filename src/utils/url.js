import axios from "axios";

const customFetch = axios.create({
  baseURL: "http://localhost:8000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  },
});

export default customFetch;
