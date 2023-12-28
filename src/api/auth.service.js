import { NotificationService } from '@/core/services/notification.service'
import { fetchQuery } from '@/core/fetchQuery/fetch-query.lib'
import { Store } from '@/store/store'

export class AuthService {
	#LOGIN_URL = '/login'
	#REGISTER_URL = '/register'

	constructor() {
		this.store = Store.getInstance()
		this.notificationService = new NotificationService()
	}

	/**
	 * This method executes loginization
	 * @param {any} body
	 * @returns {Promise<{isLoading: boolean, error: (string|null), data: (*|null)}>}
	 */
	logIn(body) {
		return fetchQuery({
			path: `${this.#LOGIN_URL}`,
			body,
			isSuccess: data => {
				this.store.logIn(data)
				this.notificationService.showNotification('success', 'Loginization is successful')
			},
			method: 'POST',
		})
	}

	/**
	 * This method executes registration
	 * @param {any} body
	 * @returns {Promise<{isLoading: boolean, error: (string|null), data: (*|null)}>}
	 */
	logOut(body) {
		return fetchQuery({
			path: `${this.#REGISTER_URL}`,
			body,
			isSuccess: data => {
				this.store.logIn(data)
				this.notificationService.showNotification('success', 'Registration is successful')
			},
			method: 'POST',
		})
	}
}