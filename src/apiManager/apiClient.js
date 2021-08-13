import axios from "axios";
import user from "../helpers/user";

let apiClient = null;

class ApiClient {
	constructor() {
		this.get = this.get.bind(this);
		this.post = this.post.bind(this);
		this.patch = this.patch.bind(this);
		this.put = this.put.bind(this);
		this.delete = this.delete.bind(this);
	}

	_getClient() {
		apiClient = axios.create({
			baseURL: process.env.REACT_APP_BACKEND_URL,
		});

		apiClient.interceptors.request.use(
			async (config) => {
				const token = user.getAuthToken() || "";
				if (token) {
					config.headers.Authorization = `Bearer ${token}`;
				}
				return config;
			},
			(err) => {
				return Promise.reject(err);
			}
		);

		apiClient.interceptors.response.use(
			async (response) => {
				return [response.data, undefined];
			},
			(err) => {
				if (err.response) {
					if (err.response.data.expired) {
						user.logoutUser();
					}
					return [undefined, "Something went wrong"];
				}
				if (err.request) {
					return [undefined, "Request failed"];
				}
				return [undefined, "Request config error"];
			}
		);

		return apiClient;
	}

	_config() {
		return {};
	}

	get(url) {
		const _get = this._getClient().get(url, this._config());

		return _get;
	}

	post(url, data) {
		const _post = this._getClient().post(url, data, this._config());

		return _post;
	}
	patch(url, data) {
		const _patch = this._getClient().patch(url, data, this._config());

		return _patch;
	}
	put(url, data) {
		const _put = this._getClient().put(url, data, this._config());

		return _put;
	}
	delete(url, data) {
		const _delete = this._getClient().delete(url, data, this._config());

		return _delete;
	}
}

const FcClient = new ApiClient();
const get = FcClient.get;
const post = FcClient.post;
const patch = FcClient.patch;
const put = FcClient.put;
const del = FcClient.delete;

export { get, post, patch, put, del };
