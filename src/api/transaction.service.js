import { fetchQuery } from '@/core/fetchQuery/fetch-query.lib'

export class TransactionService {
	#BASE_URL = '/transactions'

	/**
	 * Gets current user statistic
	 * @param {Function} onSuccess
	 * @returns {Promise<{isLoading: boolean, error: (string|null), data: (*|null)}>}
	 */
	getTransactions(onSuccess) {
		return fetchQuery({
			path: `${this.#BASE_URL}?${new URLSearchParams({orderBy: 'desc'})}}`,
			isSuccess: onSuccess
		})
	}
}