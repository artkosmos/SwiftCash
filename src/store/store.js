import { LocalStorageService } from '@/core/services/localStorage.service'
import { ACCESS_TOKEN, USER_STORAGE_KEY } from '@/constants'

export class Store {
	/**
	 * @param {Object} initialState
	 */

	static instance = null

	constructor(initialState) {
		this.observers = []
		this.storageService = new LocalStorageService()

		const savedUser = this.storageService.get(USER_STORAGE_KEY)

		const state = savedUser ? { user: savedUser } : initialState

		this.state = new Proxy(state, {
			set: (target, property, newValue) => {
				target[property] = newValue

				this.notify()
				return true
			}
		})
	}

	static getInstance() {
		if (!Store.instance) {
			Store.instance = new Store({ user: null })
		}
		return Store.instance
	}

	/**
	 * Adds an observer to store
	 * @param {Object} observer
	 */
	addObserver(observer) {
		this.observers.push(observer)
	}

	/**
	 * Removes an observer to store
	 * @param {Object} observer
	 */
	removeObserver(observer) {
		this.observers = this.observers.filter(item => item !== observer)
	}

	/**
	 * Causes updating of component if it's observer
	 */
	notify() {
		this.observers.forEach(item => item.update())
	}

	/**
	 * Login and setting user data
	 * @param {Object} user
	 */
	logIn(user) {
		this.state.user = user
		this.storageService.set(USER_STORAGE_KEY, user.username)
		this.storageService.set(ACCESS_TOKEN, user.token)
	}

	/**
	 * Logout and erasing user data
	 */
	logOut() {
		this.state.user = null
		this.storageService.remove(USER_STORAGE_KEY)
		this.storageService.remove(ACCESS_TOKEN)
	}

	/**
	 * Update user card info
	 * @param {Object} card
	 */
	updateCard(card) {
		this.state.card = card
	}
}