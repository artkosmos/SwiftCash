class SQuery {
	/**
	 * Create a new SQuery instance
	 * @param {string | HTMLElement} selector
	 */
	constructor(selector) {
		if (typeof selector === 'string') {
			this.element = document.querySelector(selector)

			if (!this.element) {
				throw new Error(`Element ${selector} don't exist`)
			}
		} else if (selector instanceof HTMLElement) {
			this.element = selector
		} else {
			throw new Error('Invalid selector was passed')
		}
	}

	/**
	 * Find first element within selected element
	 * @param {string} selector
	 * @returns {SQuery}
	 */
	find(selector) {
		const element = new SQuery(this.element.querySelector(selector))

		if (!element) {
			throw new Error(`Element ${selector} don't exist`)
		}

		return element
	}

	/**
	 * Add styles to selected element
	 * @param {string} property
	 * @param {string} value
	 * @returns {SQuery}
	 */
	style(property, value) {
		if (typeof property !== 'string' || typeof value !== 'string') {
			throw new Error('Invalid type of passed arguments')
		}
		this.element.style[property] = value
		return this
	}

	/**
	 * Put a child within a selected element (at the end)
	 * @param {HTMLElement} child
	 */
	append(child) {
		if (!(child instanceof HTMLElement)) {
			throw new Error(`Wrong argument was passed`)
		}
		this.element.append(child)
		return this
	}

	/**
	 * Put a new element before the selected element
	 * @param {HTMLElement} element
	 */
	before(element) {
		if (!(element instanceof HTMLElement)) {
			throw new Error(`Wrong argument was passed`)
		}
		this.element.before(element)
		return this
	}

	/**
	 * Get or set HTML of the selected element
	 * @param {string} [htmlContent]
	 * @returns {SQuery | string}
	 */
	html(htmlContent) {
		if (typeof htmlContent === 'undefined') {
			return this.element.innerHTML
		}
		this.element.innerHTML = htmlContent
		return this
	}
}

export function $SQuery(selector) {
	return new SQuery(selector)
}