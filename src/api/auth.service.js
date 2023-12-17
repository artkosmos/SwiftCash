import { NotificationService } from '@/core/services/notification.service'
import { fetchQuery } from '@/core/fetchQuery/fetch-query.lib'

export class AuthService {
	#BASE_URL = '/auth'

	constructor() {
		this.notificationService = new NotificationService()
	}

	/**
	 * This method executes loginization and registration
	 * @param {'login' | 'register'} type
	 * @param {any} body
	 * @returns {Promise<{isLoading: boolean, error: (string|null), data: (*|null)}>}
	 */
	auth(type, body) {
		return fetchQuery({
			path: `${this.#BASE_URL}/${type}`,
			body,
			isSuccess: data => {
				// login store
				this.notificationService.showNotification('success', 'Loginization is successful')
			},
			method: 'POST',
		})
	}
}