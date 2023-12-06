import { formatCardNumber } from '@/core/utils/format-card-number'

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
	 * Add onClick event to selected element
	 * @param {function(Event): void} callBack
	 * @returns {SQuery}
	 */
	onClick(callBack) {
		this.element.addEventListener('click', callBack)
		return this
	}

	/**
	 * Set attributes and event listener for input element
	 * @param {Object} options
	 * @param {function(Event): void} [options.onInput]
	 * @param {Object} [options.rest]
	 * @returns {SQuery}
	 */
	setInput({ onInput, ...rest }) {
		if (this.element.tagName.toLowerCase() !== 'input') {
			throw new Error('Element is not an input')
		}

		for (const [key, value] of rest) {
			this.element.setAttribute(key, value)
		}

		if (onInput) {
			this.element.addEventListener('input', onInput)
		}

		return this
	}


	/**
	 * Handle input number value
	 * @param {number} [limit]
	 * @returns {SQuery}
	 */
	numberInput(limit) {
		if (this.element.type !== 'number' || this.element.tagName.toLowerCase() !== 'input') {
			throw new Error('This method can\'t apply to current element')
		}
		this.element.addEventListener('input', event => {
			let value = event.target.value.replace(/[^0-9]/g, '')
			if (limit) {
				value = value.substring(0, limit)
			}
			event.target.value = value
		})

		return this
	}

	/**
	 * Handle credit card number input value
	 * @returns {SQuery}
	 */
	creditCardInput() {
		const limit = 16
		if (this.element.type !== 'text' || this.element.tagName.toLowerCase() !== 'input') {
			throw new Error('Element must be an input with type \'text\'')
		}
		this.element.addEventListener('input', event => {
			let value = event.target.value.replace(/[^0-9]/g, '')
			if (limit) {
				value = value.substring(0, limit)
			}
			event.target.value = formatCardNumber(value)
		})

		return this
	}

	/**
	 * Add classes to selected element
	 * @param {string | string[]} classNames
	 * @returns {SQuery}
	 */
	addClassName(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				this.element.classList.add(className)
			}
		} else {
			this.element.classList.add(classNames)
		}

		return this
	}

	/**
	 * Remove class from selected element
	 * @param {string | string[]} classNames
	 * @returns {SQuery}
	 */
	removeClassName(classNames) {
		if (Array.isArray(classNames)) {
			for (const className of classNames) {
				if (!this.element.classList.contains(className)) {
					throw new Error('Invalid class name was passed')
				}
				this.element.classList.remove(className)
			}
		} else {
			if (!this.element.classList.contains(classNames)) {
				throw new Error('Invalid class name was passed')
			}
			this.element.classList.remove(classNames)
		}

		return this
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
		} else {
			this.element.innerHTML = htmlContent
		}

		return this
	}

	/**
	 * Set or get text of the selected element
	 * @param {string} [title]
	 * @returns {SQuery | string}
	 */
	text(title) {
		if (typeof title === 'undefined') {
			return this.element.textContent
		} else {
			this.element.textContent = title
		}

		return this
	}

	/**
	 * Set or get attribute of the selected element
	 * @param {string} [attr]
	 * @param {string | boolean} [value]
	 * @returns {SQuery | string}
	 */
	attribute(attr, value) {
		if (typeof attr === 'undefined') {
			return this.element.getAttribute(attr)
		} else {
			this.element.setAttribute(attr, value)
		}

		return this
	}


}

export function $SQuery(selector) {
	return new SQuery(selector)
}