    import axios from "axios";

    const API_URL = import.meta.env.VITE_APP_API;

    const baseUrl = axios.create({
    baseURL: API_URL,
    });

    export default baseUrl;







