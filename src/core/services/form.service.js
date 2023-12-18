class FormService {
	/**
	 * Gets the values of input element and returns key and value in object
	 * @param {HTMLFormElement} form
	 * @returns {Object}
	 */
	getFormValues(form) {
		const inputs = form.querySelectorAll('input')
		const fieldsValues = {}
		inputs.forEach(input => {
			fieldsValues[input.name] = input.value
		})

		return fieldsValues
	}
}

export default new FormService()