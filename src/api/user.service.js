import { fetchQuery } from '@/core/fetchQuery/fetch-query.lib'

export class UserService {
	#BASE_URL = '/users'

	/**
	 * Gets current amount of all users
	 * @param {Function} onSuccess
	 * @param {string} search
	 * @returns {Promise<{isLoading: boolean, error: (string|null), data: (*|null)}>}
	 */
	getUsers(search, onSuccess) {
		const queryParams = search ? new URLSearchParams({search}) : ''
		return fetchQuery({
			path: `${this.#BASE_URL}?${queryParams}}`,
			isSuccess: onSuccess
		})
	}
}