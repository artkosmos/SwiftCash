import { NotificationService } from '@/core/services/notification.service'
import { fetchQuery } from '@/core/fetchQuery/fetch-query.lib'
import { Store } from '@/store/store'

export class AuthService {

	constructor() {
		this.store = Store.getInstance()
		this.notificationService = new NotificationService()
	}

	/**
	 * This method executes loginization
	 * @param {any} body
	 * @returns {Promise<{isLoading: boolean, error: (string|null), data: (*|null)}>}
	 */
	authLogin(body) {
		return fetchQuery({
			path: `/login`,
			body,
			isSuccess: data => {
				this.store.logIn(data.username, data.token)
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
	authRegister(body) {
		return fetchQuery({
			path: `/register`,
			body,
			isSuccess: () => {
				this.notificationService.showNotification('success', 'Registration is successful. try to login')
			},
			method: 'POST',
		})
	}
}