import axios, { AxiosRequestConfig } from 'axios';

import { getAppConfig } from '../../../data/config';

export class BaseEndpoint {
    protected baseUrl: string;
    protected trelloAPIKey: string;
    protected trelloToken: string;

    constructor() {
        const appConfig = getAppConfig();
        this.baseUrl = appConfig.trelloAPIURL;
        this.trelloAPIKey = appConfig.trelloAPIKey;
        this.trelloToken = appConfig.trelloToken;
    }

    protected async get(path: string, config: AxiosRequestConfig = {}) {
        return axios
            .get(`${this.baseUrl}${path}&key=${this.trelloAPIKey}&token=${this.trelloToken}`, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error.response;
            });
    }

    protected async post(path: string, body: any, config: AxiosRequestConfig = {}) {
        return axios
            .post(`${this.baseUrl}${path}&key=${this.trelloAPIKey}&token=${this.trelloToken}`, body, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error.response;
            });
    }

    protected async put(path: string, body: any, config: AxiosRequestConfig = {}) {
        return axios
            .put(`${this.baseUrl}${path}&key=${this.trelloAPIKey}&token=${this.trelloToken}`, body, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error.response;
            });
    }

    protected async patch(path: string, body: any, config: AxiosRequestConfig = {}) {
        return axios
            .patch(`${this.baseUrl}${path}&key=${this.trelloAPIKey}&token=${this.trelloToken}`, body, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error.response;
            });
    }

    protected async delete(path: string, config: AxiosRequestConfig = {}) {
        return axios
            .delete(`${this.baseUrl}${path}&key=${this.trelloAPIKey}&token=${this.trelloToken}`, config)
            .then((response) => {
                return response;
            })
            .catch((error) => {
                return error.response;
            });
    }
}
