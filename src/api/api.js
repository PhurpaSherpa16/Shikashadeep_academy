// const API_URL = import.meta.env.VITE_API_URL

// export default API_URL
const API_URL =
  import.meta.env.MODE === "development"
    ? "http://localhost:9000"
    : "https://shikshadeep-adacemy.vercel.app";

export default API_URL;
