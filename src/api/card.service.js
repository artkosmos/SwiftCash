import { NotificationService } from '@/core/services/notification.service'
import { fetchQuery } from '@/core/fetchQuery/fetch-query.lib'
import { Store } from '@/store/store'

export class CardService {
	#BASE_URL = '/my-card'

	constructor() {
		this.notificationService = new NotificationService()
		this.store = Store.getInstance()
	}

	/**
	 * Gives a card of particular user in system
	 * @param {Function} onSuccess
	 * @returns {Promise<{isLoading: boolean, error: (string|null), data: (*|null)}>}
	 */
	myCard(onSuccess) {
		return fetchQuery({
			path: `${this.#BASE_URL}`,
			isSuccess: onSuccess
		})
	}

	/**
	 * Send or get money on the balance
	 * @param {number | string} amount
	 * @param {'pop-up' | 'withdraw'} type
	 * @param {Function} onSuccess
	 * @returns {Promise<{isLoading: boolean, error: (string|null), data: (*|null)}>}
	 */
	updateBalance(amount, type, onSuccess) {
		console.log(this.store.state.card)
		return fetchQuery({
			path: `${this.#BASE_URL}/${this.store.state.card._id}/${type}`,
			method: 'PATCH',
			body: { amount: Number(amount) },
			isSuccess: () => {
				this.notificationService.showNotification('success', 'Your balance was updated successfully')
				onSuccess()
			}
		})
	}

	/**
	 * Executes a transaction from one card to another
	 * @param {Object} body
	 * @param {number} body.amount
	 * @param {string} body.toCardNumber
	 * @param {Function} onSuccess
	 * @returns {Promise<{isLoading: boolean, error: (string|null), data: (*|null)}>}
	 */
	transfer({ amount, toCardNumber }, onSuccess) {
		return fetchQuery({
			path: `${this.#BASE_URL}`,
			method: 'PATCH',
			body: {
				amount: Number(amount),
				fromCardNumber: this.store.userCardNumber,
				toCardNumber
			},
			isSuccess: () => {
				this.notificationService.showNotification('success', 'Your transaction passed successfully')
				onSuccess()
			}
		})
	}
}