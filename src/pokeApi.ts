const API_URL = 'https://pokeapi.co/api/v2/pokemon/';

export const fetchPokeList = ({ page, pageSize }: { page: number, pageSize: number }) => {
	const offset = (page - 1) * pageSize;

	return fetch(API_URL + `?limit=${ pageSize }&offset=${ offset }`).then(res => {
        if (res.status === 200) {
            return res.json();
        }
		return Promise.reject(res);
	}).catch((err) => err);
};

export const fetchPokeCard = (id: number) => {
	return fetch(API_URL + id).then(res => {
        if (res.status === 200) {
            return res.json();
        }
		return Promise.reject(res);
	}).catch((err) => err);
};
