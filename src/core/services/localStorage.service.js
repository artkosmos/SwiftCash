export class LocalStorageService {
	/**
	 * Method to set data to browser local storage
	 * @param {string} key
	 * @param {any} value
	 */
	set(key, value) {
		localStorage.setItem(key, JSON.stringify(value))
	}

	/**
	 * Method to get data from browser local storage
	 * @param {string} key
	 */
	get(key) {
		const item = localStorage.getItem(key)
		if (item) {
			return JSON.parse(item)
		} else {
			return null
		}
	}

	/**
	 * Method to delete data from browser local storage
	 * @param {string} key
	 */
	remove(key) {
		localStorage.removeItem(key)
	}

	/**
	 * Method to clear all data from browser local storage
	 */
	clear() {
		localStorage.clear()
	}
}