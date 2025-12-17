import axios from "axios";

const api = axios.create({
    baseURL: `${import.meta.env.VITE_BACK_END_URL}/api`,
    withCredentials: true,
});

export default api;

export const summarizeProduct = async (product) => {
    const payload = {
        name: product.productName,
        description: product.description,
    };
    const res = await api.post('/ai/summarize', payload);
    return res.data; // { summary: '...' }
};