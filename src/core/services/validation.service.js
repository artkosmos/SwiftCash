class ValidationService {
	constructor() {
		this.timers = {}
	}

	/**
	 * Shows border around the selected input
	 * @param {SQuery} element
	 * @param timeout
	 */
	showError(element, timeout = 2000) {
		const fieldName = element.find('input').attribute()
		element.style('borderColor', '#FF00007F')
		if (this.timers[fieldName]) {
			clearTimeout(this.timers[fieldName])
		}

		this.timers[fieldName] = setTimeout(() => {
			element.style('borderColor', '')
		}, timeout)
	}
}

export default new ValidationService()