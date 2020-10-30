import Axios from 'axios';
import {
    stringify,
} from 'qs';
import { showLoader, hideLoader } from './loader';

function createAxios() {
    const axios = Axios.create();

    axios.defaults.baseURL = `${process.env.REACT_APP_API_URL}/api/v1`;
    axios.defaults.headers.common['Content-Type'] = 'application/json';
    axios.defaults.timeout = 120000; // 120 seconds before time out

    axios.interceptors.request.use(
        (conf) => {
            showLoader();
            return conf;
        },
        (error) => {
            hideLoader();
            return Promise.reject(error);
        },
    );

    axios.interceptors.response.use(
        (response) => {
            hideLoader();
            return response;
        },
        (error) => {
            hideLoader();
            if (error && error.response) {
                if (error.response.status === 401) {
                    window.location.href = '/';
                }
                if (error.response.data) {
                    return Promise.reject(error.response.data);
                }
            }
            return Promise.reject(error);
        },
    );
    return axios;
}

// Initialise Axios
const api = createAxios();

const service = {

    async rawPost(path, payload) {

        const {
            data,
        } = await api.post(path, payload);

        return data.object;
    },

    async get(route, query = {}) {
        const {
            data,
        } = await api.get(`${route}?${stringify(query)}`);
        return data.object;
    },

    async updateById(route, id, body) {
        const headers = this.getHeaders();
        const {
            data,
        } = await api.put(`${route}/${id}`, body, {
            headers,
        });
        return data.object;
    },

    test() {
        console.log('http service is working fine.');
    }
};

window.$http = service;

export default service;
