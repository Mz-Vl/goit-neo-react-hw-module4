import axios from "axios";

const API_KEY = "_LlSImDtHRn1v-T9HD6TCb1cWltv3l_QkaTI2gntGuc";
const BASE_URL = "https://api.unsplash.com";

const fetchImages = async (query, page = 1) => {
    const response = await axios.get(`${BASE_URL}/search/photos`, {
    params: {
        query,
        page,
        per_page: 12,
        client_id: API_KEY,
        },
    });
    return response.data;
};

export default fetchImages;
