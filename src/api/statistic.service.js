import { fetchQuery } from '@/core/fetchQuery/fetch-query.lib'

export class StatisticService {
	#BASE_URL = '/statistic'

	/**
	 * Gets current user statistic
	 * @param {Function} onSuccess
	 * @returns {Promise<{isLoading: boolean, error: (string|null), data: (*|null)}>}
	 */
	getStatistic(onSuccess) {
		return fetchQuery({
			path: `${this.#BASE_URL}`,
			isSuccess: onSuccess
		})
	}
}