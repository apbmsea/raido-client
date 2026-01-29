import axios from 'axios';

export const $api = axios.create({
	baseURL:
		import.meta.env.VITE_SERVER_URL ||
		'https://apiraido.hshcode.ru/internal_layer/api/v1/',
	timeout: 10000
});