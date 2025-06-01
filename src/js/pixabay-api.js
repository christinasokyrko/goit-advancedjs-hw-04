import axios from 'axios';

const API_KEY = '50555446-a2cf9db12dc2e06100b3b332c';
const BASE_URL = 'https://pixabay.com/api/';
export const perPage = 15;

export async function fetchImages(query, page = 1) {
  const params = {
    key: API_KEY,
    q: query,
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: true,
    page,
    per_page: perPage,
  };

  const response = await axios.get(BASE_URL, { params });
  return response.data;
}
