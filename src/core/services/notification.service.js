import { $SQuery } from '@/core/customQuery/query.lib'
import styles from '@/components/layout/notification/notification.module.scss'

export class NotificationService {
	#timeout

	constructor() {
		this.#timeout = null
	}

	#setTimeout(callBack, duration) {
		if (this.#timeout) {
			clearTimeout(this.#timeout)
		}
		this.#timeout = setTimeout(callBack, duration)
	}

	/**
	 * Show error or success notification
	 * @param {('error' | 'success')} type
	 * @param {string} message
	 */
	showNotification(type, message) {
		const classNames = {
			success: styles.success,
			error: styles.error
		}

		const notificationElement = $SQuery('#notification')
		notificationElement.text(message).addClassName(classNames[type])

		this.#setTimeout(() => {
			notificationElement.removeClassName(classNames[type])
		}, 2000)
	}

}