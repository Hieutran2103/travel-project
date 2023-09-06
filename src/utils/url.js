import axios from "axios";

export const controller = new AbortController()
const customFetch = axios.create({
  baseURL: "http://localhost:3000",
  headers: {
    Authorization: `Bearer ${localStorage.getItem("access_token")}`,
  }
});

// controller.abort()

export default customFetch;
