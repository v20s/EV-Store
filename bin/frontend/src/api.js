import axios from "axios";

const API_URL = process.env.REACT_APP_API_URL || "http://localhost:8080/api";

export const getVehicles = async () => {
    return axios.get(`${API_URL}/vehicles`);
};
