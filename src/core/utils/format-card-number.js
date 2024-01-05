/**
 * Add dashes after every 4 digits
 * @param {string} cardNumber
 * @return {string}
 */
export function formatCardNumber(cardNumber) {
	return cardNumber.replace(/(\d{4})(?=\d)/g, '$1-')
}

/**
 * Format numbers with spaces **** **** **** ****
 * @param {string} cardNumber
 * @return {string}
 */
export function formatCardNumberSpace(cardNumber) {
	const formattedNumber = cardNumber.replace(/\s/g, '').match(/.{1,4}/g)
	return formattedNumber ? formattedNumber.join(' ') : ''
}