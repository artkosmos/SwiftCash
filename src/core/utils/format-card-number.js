/**
 * Add dashes after every 4 digits
 * @param {string} cardNumber
 * @return {string}
 */
export function formatCardNumber(cardNumber) {
	return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')
}