import axios from 'axios';

const baseURL = 'https://api.themoviedb.org/3/';
const axiosInstance = axios.create({
    timeout: 1000,
    baseURL,
});
const apiKey = 'c596fd9a2bdde543f91ec6b94a4c0c3c';

export class ApiService {
    static async searchMovies(search) {
        try {
            const formattedSearch = search.replace(' ', '+');
            const { data } = await axiosInstance.get('search/movie', {
                params: {
                    api_key: apiKey,
                    query: formattedSearch
                }
            });
            return data;
        } catch(e) {
            console.log('Error during searching movie: ', e.message);
        }
    }

    static getMovieById(movieId) {
        return axiosInstance.get(`movie/${movieId}`, {
            params: { api_key: apiKey }
        });
    }
}